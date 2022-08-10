import Boom from '@hapi/boom';

import { Meme } from '../../db/sequelize.connect';
import { MemeValueType, MemeUseCaseType } from './Types';

class MemeUseCase implements MemeUseCaseType {
	public create = async (MemeValue: MemeValueType) => {
		// TODO: Deberia ver si el usuario que guarda esta imagen ya tiene una imagen con e mismo nombre, en ese caso debo hacer un upload de dicho meme, en otro caso, debo guardarlo.
		try {
			const newMeme = await Meme.create({ ...MemeValue });
			return newMeme;
		} catch (err) {
			// * Ver que error deberia colocar
			throw Boom.serverUnavailable();
		}
	};
}

export default MemeUseCase;
