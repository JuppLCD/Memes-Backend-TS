import fs from 'fs';
import path from 'path';

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

				return meme;
			} else {
				const newMeme = await Meme.create({ ...MemeValue });
				return newMeme;
			}
		} catch (err) {
			throw Boom.serverUnavailable();
		}
	};

	public updateName = async (MemeToUpdate: { user_id: string; name: any; meme_id: string }) => {
		// * Solo puede editar el usuario que creo el meme (no hay sistemas de roles)
		const meme = await Meme.findOne({ where: { uuid: MemeToUpdate.meme_id, user_id: MemeToUpdate.user_id } });

		if (meme === null) {
			throw Boom.notFound();
		}

		await meme.update({ name: MemeToUpdate.name });
		await meme.save();

		return meme;
	};

	private deleteMeme(pathImage: string) {
		const pathIMG = path.join(__dirname, '../../storage/imgs', pathImage);
		if (fs.existsSync(pathIMG)) fs.unlinkSync(pathIMG);
	}

	public delete = async (meme_id: string, user_id: string) => {
		const memeToDestroy = await Meme.findOne({ where: { uuid: meme_id, user_id } });

		let resToDelete;
		if (memeToDestroy) {
			this.deleteMeme(memeToDestroy.path_image);
			resToDelete = await memeToDestroy.destroy();
		} else {
			throw Boom.notFound();
		}

		// * Deberia ver que respuesta me da al destruir la entidad
		// console.log('RESPUESTA ==>>', resToDelete, 'MEME A DESTRUIR ==>>', memeToDestroy);

		return true;
	};
}

export default MemeUseCase;
