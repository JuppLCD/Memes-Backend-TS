import { Sequelize, Dialect } from 'sequelize';

import { CONFIG_ENV } from '../config';

import UserModel from './../models/User';
import MemeModel from './../models/Meme';
import TextMemeModel from './../models/TextMeme';

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
const TextMeme = TextMemeModel(sequelize);

User.hasMany(Meme, { as: 'memes', foreignKey: 'user_id', onDelete: 'cascade' });
Meme.belongsTo(User, { foreignKey: 'user_id' });

Meme.hasMany(TextMeme, { as: 'texts', foreignKey: 'meme_id', onDelete: 'cascade' });
TextMeme.belongsTo(Meme, { foreignKey: 'meme_id' });

export { sequelize, User, Meme, TextMeme };
