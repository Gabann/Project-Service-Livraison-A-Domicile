const jwt = require("jsonwebtoken");
const {tokenDuration} = require("./const");

function sendResponse(res, statusCode, responseMessage, optionalResponse = {}) {
	res.status(statusCode).json({message: responseMessage, ...optionalResponse});
}

function verifyToken(token) {
	try {
		jwt.verify(token, process.env.TOKEN_SECRET);
		return true;
	} catch (error) {
		return false;
	}
}

function getDecodedToken(token) {
	let isTokenValid = verifyToken(token);

	if (!isTokenValid) {
		return null;
	}

	return jwt.decode(token);
}

function generateToken(id, role) {
	return jwt.sign({id: id, role: role}, process.env.TOKEN_SECRET, {
		expiresIn: tokenDuration,
	});
}

module.exports = {
	sendResponse,
	getDecodedToken,
	generateToken
};
