import { Sequelize, DataTypes } from 'sequelize';
import { User } from '../db/sequelize.connect';

export default (sequelize: Sequelize) => {
	const Meme = sequelize.define(
		'Meme',
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
			path_image: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			user_id: {
				type: DataTypes.STRING,
				references: {
					model: 'users',
					key: 'uuid',
				},
				allowNull: false,
			},
			access: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
		},
		{
			tableName: 'memes',
			timestamps: false,
		}
	);
	// access --> 0 = private, 1 = public
	// Meme.belongsTo(User, { foreignKey: 'user_id' });

	return Meme;
};
