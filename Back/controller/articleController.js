const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {sequelize} = require("../config/databaseConnection");
const dataBaseModel = require('../model/databaseModel')(sequelize);
const {sendResponse, verifyToken} = require("../utils");
const {bcryptSaltRounds} = require("../const");

const articleController = {

	addArticle: async (req, res) => {
		let transaction;

		try {
			let token = req.headers.authorization.split(" ")[1];
			let isTokenValid = verifyToken(token);
			let decodedToken = jwt.decode(token);
			let managerId = decodedToken.managerId;

			if (!isTokenValid) {
				return sendResponse(res, 401, "Invalid token");
			}

			let restaurantId = req.body.restaurantId;
			let name = req.body.name;
			let ingredients = req.body.ingredients;
			let price = req.body.price;
			let type = req.body.type;
			let preparationTimeSec = req.body.preparationTimeSec;


			let restaurant = await dataBaseModel.Restaurant.findOne({where: {id: restaurantId, GerantRestaurantId: managerId}});

			if (!restaurant) {
				return sendResponse(res, 401, "You don't have access to this restaurant");
			}

			transaction = await sequelize.transaction();


			let article = await dataBaseModel.Article.create({
				name: name,
				ingredients: ingredients,
				price: price,
				type: type,
				preparationTimeSec: preparationTimeSec,
				RestaurantId: restaurantId,
			});

			await transaction.commit();

			sendResponse(res, 201, "Article added successfully");
		} catch (error) {
			if (transaction) await transaction.rollback();
			console.error(error);
			sendResponse(res, 500, error.errors[0].message);
		}
	}
};

module.exports = articleController;
