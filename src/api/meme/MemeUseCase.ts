import fs from 'fs';
import Boom from '@hapi/boom';

import { Meme } from '../../db/sequelize.connect';
import { MemeValueType, MemeUseCaseType } from './Types';

class MemeUseCase implements MemeUseCaseType {
	public create = async (MemeValue: MemeValueType) => {
		try {
			const meme = await Meme.findOne({ where: { user_id: MemeValue.user_id, name: MemeValue.name } });

			if (meme) {
				const oldPathImage = meme.path_image;
				await meme.update({ path_image: MemeValue.path_image });
				await meme.save();

				this.deleteMeme(oldPathImage);

				return meme as MemeValueType;
			} else {
				const newMeme = await Meme.create({ ...MemeValue });
				return newMeme as MemeValueType;
			}
		} catch (err) {
			throw Boom.serverUnavailable();
		}
	};

	private deleteMeme(pathImage: string) {
		if (fs.existsSync(pathImage)) fs.unlinkSync(pathImage);
	}
}

export default MemeUseCase;
