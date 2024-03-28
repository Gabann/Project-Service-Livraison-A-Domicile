const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {sequelize} = require("../config/databaseConnection");
const dataBaseModel = require('../model/databaseModel')(sequelize);
const {sendResponse, getDecodedToken, generateToken} = require("../utils");
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
			sendResponse(res, 500, error);
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

			const token = generateToken(user.id, 'user');

			sendResponse(res, 200, "Successfully logged in", {token: token});
		} catch (error) {
			sendResponse(res, 500, error);
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
			sendResponse(res, 500, error);
		}
	},

	getAllArticlesFromRestaurant: async (req, res) => {
		try {
			let restaurantId = req.body.restaurantId;

			let restaurant = await dataBaseModel.Restaurant.findOne({
				where: {id: restaurantId},
			});

			if (!restaurant) {
				return sendResponse(res, 404, "Restaurant not found");
			}

			const articleList = await dataBaseModel.Article.findAll({
				include: [{
					model: dataBaseModel.Restaurant,
					where: {id: restaurantId}
				}],
			});

			sendResponse(res, 200, "Articles fetched successfully", {articleList});
		} catch (error) {
			console.error(error);
			sendResponse(res, 500, error);
		}
	},
};

module.exports = userController;
