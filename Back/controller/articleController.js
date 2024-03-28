
const {sequelize} = require("../config/databaseConnection");
const dataBaseModel = require('../model/databaseModel')(sequelize);
const {sendResponse} = require("../utils");
const jwt = require("jsonwebtoken");

const articleController = {

	addArticle: async (req, res) => {
		let transaction;

		try {
			let token = req.headers.authorization.split(" ")[1];
			let decodedToken = jwt.decode(token);
			let managerId = decodedToken.id;
			
			let restaurantId = req.body.restaurantId;
			let name = req.body.name;
			let ingredients = req.body.ingredients;
			let price = req.body.price;
			let type = req.body.type;
			let preparationTimeSec = req.body.preparationTimeSec;


			let restaurant = await dataBaseModel.Restaurant.findOne({
				where: {id: restaurantId},
			});

			if (!restaurant) {
				return sendResponse(res, 404, "Restaurant not found");
			}

			if (restaurant.GerantRestaurantId !== managerId) {
				return sendResponse(res, 401, "You don't have the permission to delete this restaurant");
			}

			transaction = await sequelize.transaction();


			await dataBaseModel.Article.create({
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
			sendResponse(res, 500, error);
		}
	}
};

module.exports = articleController;
