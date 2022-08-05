import Boom, { isBoom } from '@hapi/boom';
import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	let payload;
	if (!err) {
		payload = Boom.notFound().output.payload;
	} else if (isBoom(err)) {
		payload = err.output.payload;
	} else {
		payload = {
			message: err.message ?? 'Internal Server Error',
			statusCode: err.status ?? 500,
			name: err.name ?? 'Internal Server Error',
		};
	}
	res
		.status(payload.statusCode)
		.json({ error: payload.error, message: payload.message, statusCode: payload.statusCode });
};

export default errorHandler;
