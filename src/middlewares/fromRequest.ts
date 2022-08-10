import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export default function (FromRequest: Joi.ObjectSchema<any>) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const token = req.headers['authorization'];

		req.body = token ? { ...req.body, token } : req.body;

		const isLogin = req.originalUrl.includes('login');
		if (!(token && isLogin)) {
			const { token, ...toValidate } = req.body;
			try {
				await FromRequest.validateAsync({ ...toValidate }, { abortEarly: false });
			} catch (err) {
				next(err);
			}
		}
		next();
	};
}
