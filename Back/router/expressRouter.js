const express = require("express");
const expressRouter = express.Router();
const jwt = require('jsonwebtoken');
const {sendResponse} = require("../utils");
const userController = require("../controller/userControler");
const restaurantManagerController = require("../controller/restaurantManagerController");
const restaurantController = require("../controller/restaurantControler");
const articleController = require("../controller/articleController");
const orderController = require("../controller/orderController");
const delivererController = require("../controller/livreurController");
const {JsonWebTokenError} = jwt;

// function isTokenValid(req, res) {
// 	try {
// 		const token = req.headers.authorization.split(" ")[1];
//
// 		if (token == 'undefined') {
// 			sendResponse(res, 400, 'Invalid token');
// 			return;
// 		}
//
// 		const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
// 		sendResponse(res, 200, true);
// 	} catch (error) {
// 		if (error instanceof JsonWebTokenError) {
// 			console.error('JWT is malformed:', error);
// 			sendResponse(res, 400, 'Invalid token');
// 		} else {
// 			console.error('An unexpected error occurred:', error);
// 			sendResponse(res, 500, 'An unexpected error occurred');
// 		}
// 	}
// }
//
//
// function protectRoute(req, res, next) {
// 	try {
// 		const token = req.headers.authorization.split(" ")[1];
// 		const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
//
// 		return next();
// 	} catch (error) {
// 		sendResponse(res, 500, 'Please log in to access to this ressource');
// 	}
// }

expressRouter.get('/api/test', async (req, res) => {
	sendResponse(res, 200, "ouai ca marche ouai");
});

expressRouter.post('/api/user/signUp', userController.signUp);
expressRouter.post('/api/user/logIn', userController.logIn);
expressRouter.get('/api/user/getAllRestaurant', restaurantController.getAllRestaurants);
expressRouter.post('/api/user/makeOrder', orderController.makeOrder);


expressRouter.post('/api/manager/signUp', restaurantManagerController.signUp);
expressRouter.post('/api/manager/logIn', restaurantManagerController.logIn);
expressRouter.post('/api/manager/addRestaurant', restaurantController.addRestaurant);
expressRouter.get('/api/manager/getAllOwnedRestaurant', restaurantController.getAllOwnedRestaurants);
expressRouter.post('/api/manager/addArticle', articleController.addArticle);
expressRouter.post('/api/manager/deleteRestaurant', restaurantController.deleteRestaurant);

expressRouter.post('/api/deliverer/signUp', delivererController.signUp);
expressRouter.post('/api/deliverer/logIn', delivererController.logIn);


module.exports = expressRouter;
