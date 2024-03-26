const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {sequelize} = require("../config/databaseConnection");
const dataBaseModel = require('../model/databaseModel')(sequelize);
const {sendResponse} = require("../utils");
const {bcryptSaltRounds} = require("../const");

const restaurantManagerController = {

	signUp: async (req, res) => {
		try {
			let firstName = req.body.firstName;
			let lastName = req.body.lastName;
			let email = req.body.email;
			let password = req.body.password;

			let hashedPassword = await bcrypt.hash(password, bcryptSaltRounds);
			await dataBaseModel.GerantRestaurant.create({
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: hashedPassword,
			});

			sendResponse(res, 201, "Manager added successfully");
		} catch (error) {
			console.error(error);
			sendResponse(res, 500, error.errors[0].message);
		}
	},

	logIn: async (req, res) => {
		try {
			let email = req.body.email;
			let password = req.body.password;

			const manager = await dataBaseModel.GerantRestaurant.findOne({where: {email: email}});
			if (!manager) {
				return sendResponse(res, 401, "Email or password incorrect");
			}

			const isPasswordValid = await bcrypt.compare(password, manager.password);
			if (!isPasswordValid) {
				return sendResponse(res, 401, "Email or password incorrect");
			}

			const token = jwt.sign({managerId: manager.id}, process.env.TOKEN_SECRET, {
				expiresIn: "30d",
			});

			sendResponse(res, 200, "Successfully logged in", {token: token});
		} catch (error) {
			sendResponse(res, 500, error.message);
		}
	},
};

module.exports = restaurantManagerController;
