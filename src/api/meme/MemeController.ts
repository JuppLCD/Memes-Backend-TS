import { NextFunction, Request, Response } from 'express';
import { MemeUseCaseType } from './Types';
import MemeValue from './MemeValue';

import Boom from '@hapi/boom';
import Token from '../../utils/Token';

class MemeController {
	private MemeUseCase: MemeUseCaseType;
	constructor(MemeUseCase: MemeUseCaseType) {
		this.MemeUseCase = MemeUseCase;
	}

	public create = async (req: Request, res: Response, next: NextFunction) => {
		const data = Token.getDataToken(req.body.token);
		const access = req.body?.access ? req.body?.access.toLowerCase() === 'true' : false;
		const newMemeObj = {
			name: req.body.name,
			access,
			user_id: data.id,
			path_image: `${req.file?.filename}`,
		};
		try {
			if (req.file?.filename === undefined) {
				throw Boom.badData();
			}
			const meme = await this.MemeUseCase.create(
				new MemeValue(newMemeObj.name, newMemeObj.access, newMemeObj.user_id, newMemeObj.path_image)
			);
			res.json(meme);
		} catch (err) {
			next(err);
		}
	};

	public update = async (req: Request, res: Response, next: NextFunction) => {
		const data = Token.getDataToken(req.body.token);

		const datosCambiar = {
			user_id: data.id,
			name: req.body.name,
			meme_id: req.params.id,
		};

		try {
			const meme = await this.MemeUseCase.updateName(datosCambiar);
			res.json(meme);
		} catch (err) {
			next(err);
		}
	};
}

export default MemeController;
