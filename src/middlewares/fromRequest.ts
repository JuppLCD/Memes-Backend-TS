import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import Boom from '@hapi/boom';

export default function (FromRequest: Joi.ObjectSchema<any>) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const token = req.headers['authorization'];

		const isLogin = req.originalUrl.includes('login');

		if (token && isLogin) {
			req.body.token = token;
			next();
		}

		try {
			await FromRequest.validateAsync(req.body, { abortEarly: false });
		} catch (err) {
			next(err);
		}
		next();
	};
}
