const jwt = require('jsonwebtoken');
const {sequelize} = require("../config/databaseConnection");
const dataBaseModel = require('../model/databaseModel')(sequelize);
const {sendResponse, verifyToken} = require("../utils");

const orderController = {
	makeOrder: async (req, res) => {
		let transaction;
		try {
			let token = req.headers.authorization.split(" ")[1];

			let decodedToken = jwt.decode(token);
			let userId = decodedToken.id;

			let articleIdArray = req.body.articleIdArray;
			let street = req.body.street;
			let city = req.body.city;
			let postalCode = req.body.postalCode;
			let country = req.body.country;

			let address = await sequelize.transaction(async (transaction) => {
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
					status: "En attente de confirmation"
				}, {transaction});

				await dataBaseModel.CommandeAdresse.create({
					CommandeId: order.id,
					AdresseId: address.id
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
			sendResponse(res, 500, error);
		}
	},
}

module.exports = orderController;
