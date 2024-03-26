module.exports.sendResponse = function (res, statusCode, responseMessage, optionalResponse = {}) {
	res.status(statusCode).json({message: responseMessage, ...optionalResponse});
};
