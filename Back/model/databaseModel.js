const {DataTypes} = require("sequelize");

const defineModel = (sequelize, name, attributes) => {
	return sequelize.define(name, attributes);
};

module.exports = (sequelize) => {
	const Restaurant = defineModel(sequelize, "Restaurant", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	const GerantRestaurant = defineModel(sequelize, "GerantRestaurant", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});


	const Menu = defineModel(sequelize, "Menu", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		preparationTimeSec: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	});

	const Article = defineModel(sequelize, "Article", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		ingredients: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		type: {
			type: DataTypes.ENUM('Entrée', 'Plat', 'Désert', 'Boisson'),
			allowNull: true,
		},
		preparationTimeSec: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	});

	const Livreur = defineModel(sequelize, "Livreur", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	const Commande = defineModel(sequelize, "Commande", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		status: {
			type: DataTypes.ENUM('En attente', 'Annulée', 'Livrée', 'En cours de livraison'),
			allowNull: false,
		},
		expectedDeliveryTime: {
			type: DataTypes.TIME,
			allowNull: true,
		},
		actualDeliveryTime: {
			type: DataTypes.TIME,
			allowNull: true,
		},
	});

	const Adresse = defineModel(sequelize, "Adresse", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		street: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		city: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		postalCode: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		country: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	const Utilisateur = defineModel(sequelize, "Utilisateur", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phoneNumber: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true
		},
	});

	const Paiement = defineModel(sequelize, "Paiement", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
	});

	const CommandeArticle = sequelize.define('CommandeArticle', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		CommandeId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'Commandes',
				key: 'id',
			},
		},
		ArticleId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'Articles',
				key: 'id',
			},
		},
	});

	GerantRestaurant.hasOne(Restaurant);
	Restaurant.belongsTo(GerantRestaurant);

	Restaurant.hasOne(Adresse);
	Adresse.belongsTo(Restaurant);

	Restaurant.hasMany(Menu);
	Menu.belongsTo(Restaurant);

	Restaurant.hasMany(Article);
	Article.belongsTo(Restaurant);

	Menu.hasMany(Article);
	Article.belongsToMany(Menu, {through: 'Menu_Article'});

	Livreur.hasMany(Commande);
	Commande.belongsTo(Livreur);

	Utilisateur.hasMany(Commande);
	Commande.belongsTo(Utilisateur);

	Utilisateur.hasMany(Paiement);
	Paiement.belongsTo(Utilisateur);

	Commande.hasOne(Paiement);
	Paiement.belongsTo(Commande);

	Commande.hasOne(Adresse);
	Adresse.belongsToMany(Commande, {through: 'Commande_Adresse'});

	Commande.hasMany(Article);
	Article.belongsToMany(Commande, {through: {model: CommandeArticle, unique: false}});

	Commande.hasMany(Menu);
	Menu.belongsToMany(Commande, {through: 'Commande_Menu'});

	return {Restaurant, GerantRestaurant, Menu, Article, Livreur, Commande, Adresse, Utilisateur, Paiement, CommandeArticle};
};
