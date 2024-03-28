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
			unique: 'email'
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
			type: DataTypes.ENUM('Entrée', 'Plat', 'Déssert', 'Boisson'),
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
			unique: 'username'
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
			type: DataTypes.ENUM('En attente de confirmation', 'En attente de livraison', 'Annulée', 'Livrée', 'En cours de livraison'),
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
			unique: 'username'
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
			unique: 'phoneNumber'
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

	const CommandeAdresse = sequelize.define('CommandeAdresse', {
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
		AdresseId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'Adresses',
				key: 'id',
			},
		},
	});

	const MenuArticle = sequelize.define('MenuArticle', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		MenuId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'Menus',
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

	const CommandeMenu = sequelize.define('CommandeMenu', {
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
		MenuId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'Menus',
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
	Article.belongsToMany(Menu, {through: {model: MenuArticle, unique: false}});

	Livreur.hasMany(Commande);
	Commande.belongsTo(Livreur);

	Utilisateur.hasMany(Commande);
	Commande.belongsTo(Utilisateur);

	Utilisateur.hasMany(Paiement);
	Paiement.belongsTo(Utilisateur);

	Commande.hasOne(Paiement);
	Paiement.belongsTo(Commande);

	Commande.hasOne(CommandeAdresse);
	CommandeAdresse.belongsTo(Commande);

	Adresse.hasMany(CommandeAdresse);
	CommandeAdresse.belongsTo(Adresse);

	Commande.belongsToMany(Article, {through: CommandeArticle});
	Article.belongsToMany(Commande, {through: CommandeArticle});

	Commande.belongsToMany(Menu, {through: {model: CommandeMenu, unique: false}});
	Menu.belongsToMany(Commande, {through: {model: CommandeMenu, unique: false}});

	return {
		Restaurant,
		GerantRestaurant,
		Menu,
		Article,
		Livreur,
		Commande,
		Adresse,
		Utilisateur,
		Paiement,
		CommandeArticle,
		CommandeAdresse,
		MenuArticle,
		CommandeMenu
	};
};
