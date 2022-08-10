import { NextFunction, Request, Response } from 'express';
import { MemeUseCaseType, MemeValueType } from './Types';
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
			await this.MemeUseCase.create(
				new MemeValue(newMemeObj.name, newMemeObj.access, newMemeObj.user_id, newMemeObj.path_image)
			);
			res.send(200).end();
		} catch (err) {
			next(err);
		}
	};
}

export default MemeController;
