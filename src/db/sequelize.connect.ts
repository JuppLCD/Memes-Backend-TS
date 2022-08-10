import { Sequelize, Dialect } from 'sequelize';

import { CONFIG_ENV } from '../config';

import UserModel from './../models/User';
import MemeModel from './../models/Meme';

const sequelize: Sequelize = new Sequelize(CONFIG_ENV.DB.database, CONFIG_ENV.DB.username, CONFIG_ENV.DB.password, {
	host: CONFIG_ENV.DB.host,
	dialect: CONFIG_ENV.DB.dialect as Dialect,
	logging: CONFIG_ENV.DB.logging ? console.log : () => {},
	dialectOptions: {
		// ssl: { rejectUnauthorized: false },
	},
});

// Models
const User = UserModel(sequelize);
const Meme = MemeModel(sequelize);

User.hasMany(Meme, { as: 'memes', foreignKey: 'user_id', onDelete: 'cascade' });
Meme.belongsTo(User, { foreignKey: 'user_id' });

export { sequelize, User, Meme };
