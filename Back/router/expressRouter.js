const express = require("express");
const expressRouter = express.Router();
const {sendResponse} = require("../utils");
const userController = require("../controller/userControler");
const restaurantManagerController = require("../controller/managerController");
const restaurantController = require("../controller/restaurantControler");
const articleController = require("../controller/articleController");
const orderController = require("../controller/orderController");
const delivererController = require("../controller/delivererController");
const jwt = require("jsonwebtoken");

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

// function protectRoute(req, res, next, role) {
// 	try {
// 		if (!req.headers.authorization) {
// 			return sendResponse(res, 401, 'Authorization token is missing');
// 		}
//
// 		const token = req.headers.authorization.split(" ")[1];
// 		jwt.verify(token, process.env.TOKEN_SECRET);
//
// 		let decodedToken = jwt.decode(token);
//
// 		if (decodedToken.role !== role) {
// 			return sendResponse(res, 401, 'You are not authorized to access this');
// 		}
//
// 		return next();
// 	} catch (error) {
// 		sendResponse(res, 500, `${error.message}: Please verify log in status to access this`);
// 	}
// }

function protectRoute(role = '') {
	return function (req, res, next) {
		try {
			if (!req.headers.authorization) {
				return sendResponse(res, 401, 'Authorization token is missing');
			}

			const token = req.headers.authorization.split(" ")[1];
			jwt.verify(token, process.env.TOKEN_SECRET);

			if (role !== '') {
				let decodedToken = jwt.decode(token);

				if (decodedToken.role !== role) {
					return sendResponse(res, 401, 'You are not authorized to access this. ' +
						'You are a ' + decodedToken.role + ' and you need to be a ' + role + ' to access this)');
				}
			}

			return next();
		} catch (error) {
			sendResponse(res, 500, `${error.message}: Please verify log in status to access this`);
		}
	};
}

expressRouter.get('/api/test', async (req, res) => {
	sendResponse(res, 200, "ouai ca marche ouai");
});

expressRouter.post('/api/user/signUp', userController.signUp);
expressRouter.post('/api/user/logIn', userController.logIn);
expressRouter.get('/api/user/getAllRestaurant', userController.getAllRestaurants);
expressRouter.get('/api/user/getAllArticlesFromRestaurant', userController.getAllArticlesFromRestaurant);
expressRouter.post('/api/user/makeOrder', protectRoute('user'), orderController.makeOrder);


expressRouter.post('/api/manager/signUp', restaurantManagerController.signUp);
expressRouter.post('/api/manager/logIn', restaurantManagerController.logIn);
expressRouter.get('/api/manager/getAllOwnedRestaurant', protectRoute('manager'), restaurantManagerController.getAllOwnedRestaurants);
expressRouter.post('/api/manager/addRestaurant', protectRoute('manager'), restaurantController.addRestaurant);
expressRouter.post('/api/manager/addArticle', protectRoute('manager'), articleController.addArticle);
expressRouter.post('/api/manager/deleteRestaurant', protectRoute('manager'), restaurantController.deleteRestaurant);
expressRouter.post('/api/manager/getRestaurantOpenOrders', protectRoute('manager'), restaurantManagerController.getRestaurantOpenOrders);
expressRouter.post('/api/manager/confirmOrder', protectRoute('manager'), restaurantManagerController.confirmOrder);
expressRouter.post('/api/manager/cancelOrder', protectRoute('manager'), restaurantManagerController.cancelOrder);


expressRouter.post('/api/deliverer/signUp', delivererController.signUp);
expressRouter.post('/api/deliverer/logIn', delivererController.logIn);
expressRouter.get('/api/deliverer/getAllOpenOrders', protectRoute('deliverer'), delivererController.getAllOpenOrders);
expressRouter.post('/api/deliverer/assignOrderToSelf', protectRoute('deliverer'), delivererController.assignOrderToSelf);

module.exports = expressRouter;
