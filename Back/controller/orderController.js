const jwt = require('jsonwebtoken');
const {sequelize} = require("../config/databaseConnection");
const dataBaseModel = require('../model/databaseModel')(sequelize);
const {sendResponse, verifyToken} = require("../utils");

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

			let articleIdArray = req.body.articleIdArray;
			let street = req.body.street;
			let city = req.body.city;
			let postalCode = req.body.postalCode;
			let country = req.body.country;

			let adress = await sequelize.transaction(async (transaction) => {
				let addressQuery = await dataBaseModel.Adresse.findOne({
					where: {
						street: street,
						city: city,
						postalCode: postalCode,
						country: country
					}
				}, {transaction});

				if (addressQuery) {
					return addressQuery;
				} else {
					return await dataBaseModel.Adresse.create({
						street: street,
						city: city,
						postalCode: postalCode,
						country: country,
					}, {transaction});
				}
			});

			let order = await sequelize.transaction(async (transaction) => {
				let order = await dataBaseModel.Commande.create({
					UtilisateurId: userId,
					status: "En attente"
				}, {transaction});

				await dataBaseModel.CommandeAdresse.create({
					CommandeId: order.id,
					AdresseId: adress.id
				}, {transaction});

				return order;
			});

			for (const item of articleIdArray) {
				await sequelize.transaction(async (transaction) => {
					await dataBaseModel.CommandeArticle.create({
						CommandeId: order.id,
						ArticleId: item,
					}, {transaction});
				});
			}

			sendResponse(res, 201, "Order added successfully");
		} catch (error) {
			if (transaction) await transaction.rollback();
			console.error(error);
			sendResponse(res, 500, error.message);
		}
	}
}

module.exports = orderController;
