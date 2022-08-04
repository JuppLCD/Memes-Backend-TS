import dotenv from 'dotenv';
dotenv.config();

import PRODUCTION_ENV from './production';
import DEVELOPMENT_ENV from './development';

const { NODE_ENV } = process.env;

let currentEnv = DEVELOPMENT_ENV;

if (NODE_ENV === 'prod') {
	currentEnv = PRODUCTION_ENV;
}

export default currentEnv;
