const express = require("express");
const expressRouter = express.Router();
const jwt = require('jsonwebtoken');
const {sendResponse} = require("../utils");
const userController = require("../controller/userControler");
const restaurantManagerController = require("../controller/restaurantManagerController");
const restaurantController = require("../controller/restaurantControler");
const {JsonWebTokenError} = jwt;

function isTokenValid(req, res) {
	try {
		const token = req.headers.authorization.split(" ")[1];

		if (token == 'undefined') {
			sendResponse(res, 400, 'Invalid token');
			return;
		}

		const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
		sendResponse(res, 200, true);
	} catch (error) {
		if (error instanceof JsonWebTokenError) {
			console.error('JWT is malformed:', error);
			sendResponse(res, 400, 'Invalid token');
		} else {
			console.error('An unexpected error occurred:', error);
			sendResponse(res, 500, 'An unexpected error occurred');
		}
	}
}

function protectRoute(req, res, next) {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

		return next();
	} catch (error) {
		sendResponse(res, 500, 'Please log in to access to this ressource');
	}
}


expressRouter.get('/api/test', async (req, res) => {
	sendResponse(res, 200, "ouai ca marche ouai");
});

expressRouter.post('/api/user/signUp', userController.signUp);
expressRouter.post('/api/user/logIn', userController.logIn);

expressRouter.post('/api/manager/signUp', restaurantManagerController.signUp);
expressRouter.post('/api/manager/logIn', restaurantManagerController.logIn);

expressRouter.get('/api/manager/addRestaurant', restaurantController.addRestaurant);
expressRouter.get('/api/manager/getAllRestaurant', restaurantController.getAllRestaurants);

module.exports = expressRouter;
