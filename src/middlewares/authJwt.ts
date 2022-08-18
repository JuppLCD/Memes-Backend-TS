import Boom from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';

import Token from '../utils/Token';

export default function (req: Request, res: Response, next: NextFunction) {
	const token = req.headers['authorization'];

	if (token) {
		try {
			const data = Token.getDataToken(token);
			req.body = { ...req.body, dataToken: data };
			next();
		} catch (err) {
			next(Boom.unauthorized());
		}
	} else {
		next(Boom.unauthorized());
	}
}
