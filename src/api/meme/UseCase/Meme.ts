import Boom from '@hapi/boom';

import { Meme, TextMeme } from '../../../db/sequelize.connect';
import { MemeValueType, MemeUseCaseType } from '../Types';

import { uploadFileFirebase, deleteImageFirebase } from '../../../db/firebase';
import deleteImageOfDisk from '../../../utils/deleteImageOfDisk';

import { CONFIG_ENV } from '../../../config';

class MemeUseCase implements MemeUseCaseType {
	public create = async (memeValue: MemeValueType) => {
		const meme = await Meme.findOne({ where: { user_id: memeValue.user_id, name: memeValue.name } });
		if (meme !== null) {
			throw Boom.conflict('Meme exist');
		}
		await this.storeImageFirebase(memeValue.path_image);

		const url = this.generateUrlOfMeme(memeValue.path_image);

		const newMeme = await Meme.create({
			...memeValue,
			path_image: url,
		});

		this.deleteOfDisk(url);
		return newMeme;
	};

	public updateMeme = async (memeToUpdate: MemeValueType) => {
		const meme = await Meme.findOne({ where: { uuid: memeToUpdate.uuid, user_id: memeToUpdate.user_id } });

		if (meme === null) {
			throw Boom.notFound();
		}
		await this.storeImageFirebase(memeToUpdate.path_image);

		const oldPathImage = meme.path_image;

		const url = this.generateUrlOfMeme(memeToUpdate.path_image);
		await meme.update({ ...memeToUpdate, path_image: url });
		await meme.save();

		await this.deleteMeme(oldPathImage);
		this.deleteOfDisk(url);

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

	public delete = async (meme_id: string, user_id: string) => {
		const memeToDestroy = await Meme.findOne({ where: { uuid: meme_id, user_id } });

		let resToDelete;
		if (memeToDestroy) {
			await this.deleteMeme(memeToDestroy.path_image);
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

	public getMeme = async (user_id: string, meme_id: string) => {
		const UserMeme = await Meme.findAll({
			where: { user_id, uuid: meme_id },
			include: {
				as: 'texts',
				model: TextMeme,
				required: false,
				attributes: {
					exclude: ['meme_id'],
				},
			},
		});

		return UserMeme;
	};

	public publicMemes = async () => {
		const allPublicMemes = await Meme.findAll({ where: { access: true } });

		// if (allPublicMemes === null) {
		// Tirar algun error
		// }
		return allPublicMemes;
	};

	private deleteMeme(pathImage: string) {
		this.deleteOfDisk(pathImage);
		const filename = pathImage.split('/o/')[1].split('?alt=media')[0];

		return deleteImageFirebase(filename);
	}

	private deleteOfDisk(pathImage: string) {
		const filename = pathImage.split('/o/')[1].split('?alt=media')[0];
		deleteImageOfDisk(filename);
	}

	private generateUrlOfMeme(path_image: string) {
		const bucket = CONFIG_ENV.FIREBASE.bucket.split('//')[1];

		const url = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${path_image}?alt=media`;
		return url;
	}

	private storeImageFirebase = async (path_image: string) => {
		const imgSave = await uploadFileFirebase(path_image);
		if (!imgSave[0].baseUrl) {
			throw Boom.serverUnavailable('Error to save image');
		}
	};
}

export default MemeUseCase;
