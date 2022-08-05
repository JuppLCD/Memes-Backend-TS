import Boom from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import { CONFIG_ENV } from '../config';

export default function (req: Request, res: Response, next: NextFunction) {
	const token = req.headers['authorization'];
	if (token) {
		try {
			const data = jwt.verify(token, CONFIG_ENV.ACCESS_TOKEN);
			req.body.dataToken = data;
			next();
		} catch (err) {
			console.error(err);
			next(err);
		}
	} else {
		next(Boom.unauthorized());
	}
}
