const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {sequelize} = require("../config/databaseConnection");
const dataBaseModel = require('../model/databaseModel')(sequelize);
const {sendResponse, verifyToken} = require("../utils");

const restaurantController = {
	addRestaurant: async (req, res) => {
		let transaction;

		try {
			let token = req.headers.authorization.split(" ")[1];
			let isTokenValid = verifyToken(token);

			if (!isTokenValid) {
				return sendResponse(res, 401, "Invalid token");
			}

			let decodedToken = jwt.decode(token);
			let managerId = decodedToken.managerId;

			console.log(managerId);

			let name = req.body.name;
			let street = req.body.steet;
			let city = req.body.city;
			let postalCode = req.body.postalCode;
			let country = req.body.country;

			transaction = await sequelize.transaction();

			let adresse = await dataBaseModel.Adresse.create({
				street: street,
				city: city,
				postalCode: postalCode,
				country: country,
			}, {transaction});

			let restaurant = await dataBaseModel.Restaurant.create({
				name: name,
				adresseId: adresse.id,
				GerantRestaurantId: managerId
			}, {transaction});

			await adresse.update({RestaurantId: restaurant.id}, {transaction});

			await transaction.commit();

			sendResponse(res, 201, "Restaurant added successfully");
		} catch (error) {
			if (transaction) await transaction.rollback();
			console.error(error);
			sendResponse(res, 500, error.errors[0].message);
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
			sendResponse(res, 500, error.errors[0].message);
		}
	},

	getAllOwnedRestaurants: async (req, res) => {
		try {
			let token = req.headers.authorization.split(" ")[1];
			let isTokenValid = verifyToken(token);

			if (!isTokenValid) {
				return sendResponse(res, 401, "Invalid token");
			}

			let decodedToken = jwt.decode(token);
			let managerId = decodedToken.managerId;

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
			sendResponse(res, 500, error.errors[0].message);
		}
	},
};

module.exports = restaurantController;
