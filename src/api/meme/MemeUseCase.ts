import Boom from '@hapi/boom';

import { Meme } from '../../db/sequelize.connect';
import { MemeValueType, MemeUseCaseType } from './Types';

import deleteImage from '../../utils/deleteImage';

class MemeUseCase implements MemeUseCaseType {
	public create = async (MemeValue: MemeValueType) => {
		const meme = await Meme.findOne({ where: { user_id: MemeValue.user_id, name: MemeValue.name } });

		if (meme !== null) {
			throw Boom.conflict('Meme exist');
		}

		const newMeme = await Meme.create({ ...MemeValue });
		return newMeme;
	};

	public updateMeme = async (MemeToUpdate: { user_id: string; path_image: string; meme_id: string }) => {
		const meme = await Meme.findOne({ where: { uuid: MemeToUpdate.meme_id, user_id: MemeToUpdate.user_id } });

		if (meme === null) {
			throw Boom.notFound();
		}

		const oldPathImage = meme.path_image;
		await meme.update({ path_image: MemeToUpdate.path_image });
		await meme.save();

		this.deleteMeme(oldPathImage);

		return meme;
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
		deleteImage('src/public/storage/imgs', pathImage);
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

	public user = async (user_id: string) => {
		const memeToDestroy = await Meme.findAll({ where: { user_id } });

		// if (memeToDestroy === null) {
		// Tirar algun error
		// }
		return memeToDestroy;
	};

	public publicMemes = async () => {
		const allPublicMemes = await Meme.findAll({ where: { access: true } });

		// if (allPublicMemes === null) {
		// Tirar algun error
		// }
		return allPublicMemes;
	};
}

export default MemeUseCase;
