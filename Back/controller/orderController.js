const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {sequelize} = require("../config/databaseConnection");
const dataBaseModel = require('../model/databaseModel')(sequelize);
const {sendResponse, verifyToken} = require("../utils");
const {bcryptSaltRounds} = require("../const");

const orderController = {
	makeOrder: async (req, res) => {
		let transaction;
		try {
			let token = req.headers.authorization.split(" ")[1];
			let isTokenValid = verifyToken(token);

			if (!isTokenValid) {
				return sendResponse(res, 401, "Invalid token");
			}

			let decodedToken = jwt.decode(token);
			let userId = decodedToken.userId;

			transaction = await sequelize.transaction();

			let articleIdArray = req.body.articleIdArray;

			let order = await dataBaseModel.Commande.create({
				UtilisateurId: userId,
				status: "En attente"
			});


			for (const item of articleIdArray) {
				await dataBaseModel.CommandeArticle.create({
					CommandeId: order.id,
					ArticleId: item,
				});
			}

			await transaction.commit();

			sendResponse(res, 201, "Order added successfully");
		} catch (error) {
			if (transaction) await transaction.rollback();
			console.error(error);
			sendResponse(res, 500, error.message);
		}
	}
};

module.exports = orderController;
