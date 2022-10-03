import dotenv from 'dotenv';
dotenv.config();

const appName = `${process.env.APP_NAME}`;

export default {
	PORT: process.env.PORT ?? 8000,
	APP_NAME: appName,
	ACCESS_TOKEN: process.env.ACCESS_TOKEN_SECRET ?? '',
	DB: {
		username: process.env.DB_USERNAME ?? 'root',
		password: process.env.DB_PASSWORD ?? '',
		database: `${process.env.DB_DATABASE ?? appName}_DEV`,
		host: process.env.DB_HOST ?? 'localhost',
		dialect: `${process.env.DB_DIALECT ?? 'mysql'}`,
		logging: process.env.DB_LOGGING === 'true',
		force: process.env.DB_FORCE === 'true',
	},
	FIREBASE: {
		bucket: process.env.FIREBASE_STORAGE_BUCKET ?? '',
		credential: {
			type: process.env.FIREBASE_CREDENTIALS_type ?? '',
			project_id: process.env.FIREBASE_CREDENTIALS_project_id ?? '',
			private_key_id: process.env.FIREBASE_CREDENTIALS_private_key_id ?? '',
			private_key: process.env.FIREBASE_CREDENTIALS_private_key ?? '',
			client_email: process.env.FIREBASE_CREDENTIALS_client_email ?? '',
			client_id: process.env.FIREBASE_CREDENTIALS_client_id ?? '',
			auth_uri: process.env.FIREBASE_CREDENTIALS_auth_uri ?? '',
			token_uri: process.env.FIREBASE_CREDENTIALS_token_uri ?? '',
			auth_provider_x509_cert_url: process.env.FIREBASE_CREDENTIALS_auth_provider_x509_cert_url ?? '',
			client_x509_cert_url: process.env.FIREBASE_CREDENTIALS_client_x509_cert_url ?? '',
		},
	},
};
