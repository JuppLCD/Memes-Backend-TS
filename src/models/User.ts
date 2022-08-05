import { DataTypes, Sequelize } from 'sequelize/types';

// import bcrypt from 'bcryptjs';

export default (sequelize: Sequelize) => {
	const User = sequelize.define(
		'User',
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
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

	return User;
};