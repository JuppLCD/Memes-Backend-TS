import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
// import { User } from '../db/sequelize.connect';

export interface MemeModel extends Model<InferAttributes<MemeModel>, InferCreationAttributes<MemeModel>> {
	name: string;
	uuid: string;
	path_image: string;
	user_id: string;
	access: boolean;
	template?: string;
}

export default (sequelize: Sequelize) => {
	const Meme = sequelize.define<MemeModel>(
		'Meme',
		{
			uuid: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
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
			template: {
				type: DataTypes.STRING,
				allowNull: true,
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
