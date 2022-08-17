import dotenv from 'dotenv';
dotenv.config();

const appName = `${process.env.APP_NAME}`;

export default {
	PORT: process.env.PORT ?? 8000,
	APP_NAME: appName,
	ACCESS_TOKEN: process.env.ACCESS_TOKEN_SECRET ?? '',
	DB: {
		username: `${process.env.DB_USERNAME}`,
		password: `${process.env.DB_PASSWORD}`,
		database: `${process.env.DB_DATABASE ?? appName}`,
		host: `${process.env.DB_HOST}`,
		dialect: `${process.env.DB_DIALECT ?? 'mysql'}`,
		logging: process.env.DB_LOGGING === 'true',
	},
};
