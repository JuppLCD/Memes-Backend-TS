import Boom, { isBoom } from '@hapi/boom';
import { ErrorRequestHandler } from 'express';
import Joi from 'joi';
import deleteImageOfDisk from '../utils/deleteImageOfDisk';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	let payload;
	console.log(JSON.stringify(err));

	switch (true) {
		case !err:
			payload = Boom.notFound().output.payload;
			break;
		case isBoom(err):
			payload = err.output.payload;
			break;
		case Joi.isError(err):
			payload = { statusCode: 400, message: err.details, error: 'Error of Validation' };
			break;
		case err.name === 'TokenExpiredError':
			payload = Boom.unauthorized().output.payload;
			break;
		default:
			payload = {
				message: 'Internal Server Error',
				statusCode: 500,
				error: 'Internal Server Error',
			};
	}

	// Delete Image if exist Error
	if ((err && req.originalUrl.includes('/meme/create')) || req.originalUrl.includes('/meme/update')) {
		deleteImageOfDisk(`${req.file?.filename}`);
	}

	const jsonRes = { error: payload.error, message: payload.message, statusCode: payload.statusCode };
	res.status(jsonRes.statusCode).json(jsonRes);
};

export default errorHandler;
