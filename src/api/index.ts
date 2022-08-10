import express from 'express';

const router = express.Router();

// import { readdirSync } from 'fs';

// const filesArray = readdirSync(__dirname);

// filesArray.forEach((file) => {
// 	if (!file.includes('.')) {
// 		router.use(`/${file}`, require(`./${file}/router`));
// 	}
// });

import UserRouter from './user/router';
router.use('/user', UserRouter);

import MemeRouter from './meme/router';
router.use('/meme', MemeRouter);

export default router;
