import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';

export interface TextMemeModel extends Model<InferAttributes<TextMemeModel>, InferCreationAttributes<TextMemeModel>> {
	uuid: string;
	text: string;
	color: string;
	x: number;
	y: number;
	fs: number;
	meme_id: string;
}

export default (sequelize: Sequelize) => {
	const TextMeme = sequelize.define<TextMemeModel>(
		'TextMeme',
		{
			uuid: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				primaryKey: true,
			},
			text: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			color: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			x: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			y: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			fs: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			meme_id: {
				type: DataTypes.STRING,
				references: {
					model: 'memes',
					key: 'uuid',
				},
				allowNull: false,
			},
		},
		{
			tableName: 'texts_meme',
			timestamps: false,
		}
	);

	return TextMeme;
};
