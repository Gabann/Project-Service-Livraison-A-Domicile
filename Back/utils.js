const jwt = require("jsonwebtoken");

module.exports.sendResponse = function (res, statusCode, responseMessage, optionalResponse = {}) {
	res.status(statusCode).json({message: responseMessage, ...optionalResponse});
};

module.exports.verifyToken = function (token) {
	try {
		jwt.verify(token, process.env.TOKEN_SECRET);
		return true;
	} catch (error) {
		return false;
	}
};
