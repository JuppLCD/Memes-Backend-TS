import Boom from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';

import { validate as uuidValidate, version as uuidVersion } from 'uuid';

export default function (req: Request, res: Response, next: NextFunction) {
	const uuid = req.params.id;
	const isUuid = uuidValidate(uuid) && uuidVersion(uuid) === 4;

	if (isUuid) {
		next();
	} else {
		next(Boom.badRequest);
	}
}
