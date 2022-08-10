import { Sequelize, DataTypes } from 'sequelize';
import { Meme } from '../db/sequelize.connect';

export default (sequelize: Sequelize) => {
	const User = sequelize.define(
		'User',
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			uuid: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: {
						msg: 'Must be a valid email address',
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			tableName: 'users',
			timestamps: false,
		}
	);
	// User.hasMany(Meme, { as: 'memes', foreignKey: 'user_id', onDelete: 'cascade' });

	return User;
};
