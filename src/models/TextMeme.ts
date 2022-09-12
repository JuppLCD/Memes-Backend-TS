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
				type: DataTypes.UUIDV4,
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
				type: DataTypes.NUMBER,
				allowNull: false,
			},
			y: {
				type: DataTypes.NUMBER,
				allowNull: false,
			},
			fs: {
				type: DataTypes.NUMBER,
				allowNull: false,
			},
			meme_id: {
				type: DataTypes.UUIDV4,
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
