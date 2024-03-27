const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {sequelize} = require("../config/databaseConnection");
const dataBaseModel = require('../model/databaseModel')(sequelize);
const {sendResponse, getDecodedToken, verifyToken, generateToken} = require("../utils");
const {bcryptSaltRounds} = require("../const");
const {Sequelize} = require("sequelize");

const managerController = {

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
			sendResponse(res, 500, error);
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

			const token = generateToken(manager.id, 'manager');

			sendResponse(res, 200, "Successfully logged in", {token: token});
		} catch (error) {
			sendResponse(res, 500, error);
		}
	},

	getAllOwnedRestaurants: async (req, res) => {
		try {
			let token = req.headers.authorization.split(" ")[1];
			let decodedToken = getDecodedToken(token);
			let managerId = decodedToken.id;

			const restaurantLIst = await dataBaseModel.Restaurant.findAll({
				where: {GerantRestaurantId: managerId},
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

	getRestaurantOpenOrders: async (req, res) => {
		try {

			let token = req.headers.authorization.split(" ")[1];
			let decodedToken = getDecodedToken(token);

			let managerId = decodedToken.id;
			let restaurantId = req.body.restaurantId;

			let restaurant = await dataBaseModel.Restaurant.findOne({
				where: {id: restaurantId},
			});

			if (!restaurant) {
				return sendResponse(res, 404, "Restaurant not found");
			}

			if (restaurant.GerantRestaurantId !== managerId) {
				return sendResponse(res, 401, "You don't have to access this restaurant orders");
			}


			let result = await dataBaseModel.Commande.findAll({
				where: {
					status: 'En attente de confirmation'
				},
				include: [{
					model: dataBaseModel.Article,
					include: [{
						model: dataBaseModel.Restaurant,
						where: {id: restaurantId}
					}]
				}],
				group: ['Commande.id']
			});

			if (result.length === 0) {
				return sendResponse(res, 404, "No open orders found");
			}

			sendResponse(res, 200, "Successfully fetched open orders", {result});
		} catch (error) {
			sendResponse(res, 500, error);
		}
	},

	confirmOrder: async (req, res) => {
		try {
			let orderId = req.body.orderId;

			let order = await dataBaseModel.Commande.findOne({
				where: {
					id: orderId,
					status: 'En attente de confirmation'
				}
			});

			if (!order) {
				return sendResponse(res, 404, "Order not found");
			}

			await order.update({
				status: 'En attente de livraison',
			});

			sendResponse(res, 200, "Order confirmed successfully");
		} catch (error) {
			sendResponse(res, 500, error);
		}
	},

	cancelOrder: async (req, res) => {
		try {
			let orderId = req.body.orderId;

			let order = await dataBaseModel.Commande.findOne({
				where: {
					id: orderId,
					status: 'En attente de confirmation'
				}
			});

			if (!order) {
				return sendResponse(res, 404, "Order not found");
			}

			await order.update({
				status: 'Annulée',
			});

			sendResponse(res, 200, "Order cancelled successfully");
		} catch (error) {
			sendResponse(res, 500, error);
		}
	}
};

module.exports = managerController;
