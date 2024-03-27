const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {sequelize} = require("../config/databaseConnection");
const dataBaseModel = require('../model/databaseModel')(sequelize);
const {sendResponse, getDecodedToken} = require("../utils");
const {bcryptSaltRounds} = require("../const");

const userController = {
	signUp: async (req, res) => {
		try {
			let username = req.body.username;
			let password = req.body.password;
			let email = req.body.email;
			let phoneNumber = req.body.phoneNumber;

			let hashedPassword = await bcrypt.hash(password, bcryptSaltRounds);
			await dataBaseModel.Utilisateur.create({username: username, email: email, password: hashedPassword, phoneNumber: phoneNumber});

			sendResponse(res, 201, "User added successfully");
		} catch (error) {
			console.error(error);
			sendResponse(res, 500, error.message);
		}
	},

	logIn: async (req, res) => {
		try {
			let username = req.body.username;
			let password = req.body.password;

			const user = await dataBaseModel.Utilisateur.findOne({where: {username: username}});
			if (!user) {
				return sendResponse(res, 401, "Username or password incorrect");
			}

			const isPasswordValid = await bcrypt.compare(password, user.password);
			if (!isPasswordValid) {
				return sendResponse(res, 401, "Username or password incorrect");
			}

			const token = jwt.sign({userId: user.id}, process.env.TOKEN_SECRET, {
				expiresIn: "30d",
			});

			sendResponse(res, 200, "Successfully logged in", {token: token});
		} catch (error) {
			sendResponse(res, 500, error.message);
		}
	},

	getAllRestaurants: async (req, res) => {
		try {
			const restaurantLIst = await dataBaseModel.Restaurant.findAll({
				include: [{
					model: dataBaseModel.Adresse,
					attributes: ["street", "city", "postalCode", "country"],
				}],
			});

			sendResponse(res, 200, "Restaurants fetched successfully", {restaurantLIst});
		} catch (error) {
			console.error(error);
			sendResponse(res, 500, error.message);
		}
	},

	getAllArticlesFromRestaurant: async (req, res) => {
		try {
			let token = req.headers.authorization.split(" ")[1];
			let decodedToken = getDecodedToken(token);
			if (!decodedToken) {
				return sendResponse(res, 401, "Invalid token");
			}

			let restaurantId = req.body.restaurantId;

			const articleList = await dataBaseModel.Article.findAll({
				include: [{
					model: dataBaseModel.Restaurant,
					where: {id: restaurantId}
				}],
			});

			sendResponse(res, 200, "Articles fetched successfully", {articleList});
		} catch (error) {
			console.error(error);
			sendResponse(res, 500, error.message);
		}
	},
};

module.exports = userController;
