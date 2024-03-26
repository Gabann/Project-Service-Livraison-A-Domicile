const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {sequelize} = require("../config/databaseConnection");
const dataBaseModel = require('../model/databaseModel')(sequelize);
const {sendResponse} = require("../utils");
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
			sendResponse(res, 500, error.errors[0].message);
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
};

module.exports = userController;
