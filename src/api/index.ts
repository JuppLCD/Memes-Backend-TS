import { Router } from 'express';
import { readdirSync } from 'fs';

const router = Router();

const filesArray = readdirSync(__dirname);

filesArray.forEach((file) => {
	if (!file.includes('.')) {
		router.use(`/${file}`, require(`./${file}/router`));
	}
});

export default router;
