const {Sequelize} = require('sequelize');
require('dotenv').config();

let sequelize = new Sequelize(
	'',
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: 'mysql',
	}
);

sequelize
	.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`)
	.then(() => {
		console.log('Database check complete.');
	})
	.catch((error) => {
		console.error('Error checking database:', error.message);
	});

sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: 'mysql',
	}
);


sequelize
	.sync({force: false, alter: false})
	.then(() => {
		console.log('Database successfully synchronized.');
	})
	.catch((error) => {
		console.error('Error connecting to database:', error.message);
	});

module.exports = {
	sequelize,
};
