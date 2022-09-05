import Boom, { isBoom } from '@hapi/boom';
import { ErrorRequestHandler } from 'express';
import Joi from 'joi';
import deleteImageError from '../utils/deleteImageError';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	let payload;
	if (!err) {
		payload = Boom.notFound().output.payload;
	} else if (isBoom(err)) {
		payload = err.output.payload;
	} else if (Joi.isError(err)) {
		payload = { statusCode: 400, message: err.details, error: 'Error of Validation' };
	} else {
		console.log(JSON.stringify(err));

		payload = {
			message: 'Internal Server Error',
			statusCode: 500,
			error: 'Internal Server Error',
		};
	}

	// Delete Image if exist Error
	if ((err && req.originalUrl.includes('/meme/create')) || req.originalUrl.includes('/meme/update')) {
		deleteImageError(req);
	}

	const jsonRes = { error: payload.error, message: payload.message, statusCode: payload.statusCode };
	res.status(jsonRes.statusCode).json(jsonRes);
};

export default errorHandler;
