import path from 'path';
import express, { Application, ErrorRequestHandler } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

// Import api routes
import routerApi from './api';

// Settings
app.set('port', process.env.PORT || 8080);

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// static files
app.use(express.static(path.join(__dirname, 'public')));

// Router api
app.use('/api/v1', routerApi);

// Error Handler
const errorHandler: ErrorRequestHandler = (error, req, res) => {
	if (!error) {
		res.status(404);
	} else {
		const errorMessage = typeof error === 'string' ? error : error.message ?? error.menssage;
		const errorStatus = error.status ?? 500;
		const errorType = error.type ?? 'internal Server Error';

		res.status(errorStatus).json({
			statusCode: errorStatus,
			error: errorType,
			menssage: errorMessage,
		});
	}
};
app.use(errorHandler);

export default app;
