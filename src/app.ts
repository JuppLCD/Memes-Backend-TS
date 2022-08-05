import path from 'path';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { CONFIG_ENV } from './config';

const app = express();

// Settings
app.set('port', CONFIG_ENV.PORT);

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// static files
app.use(express.static(path.join(__dirname, 'public')));

// Router api
import routerApi from './api';
app.use('/api/v1', routerApi);

// Error Handler
import errorHandler from './utils/errorHandler';
app.use(errorHandler);

export default app;
