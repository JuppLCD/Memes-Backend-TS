import express from 'express';

const router = express.Router();

import MemeControllerClass from './MemeController';
import MemeUseCaseClass from './MemeUseCase';

const MemeUseCase = new MemeUseCaseClass();
const MemeController = new MemeControllerClass(MemeUseCase);

// Middlewares
import fromRequest from './../../middlewares/fromRequest';
import uuidValidateParams from '../../middlewares/uuidValidateParams';

// Validations
import MemeRequest from '../../validations/MemeRequest';
import UpdateMemeRequest from '../../validations/UpdateMemeRequest';

import upload from '../../utils/storage';

router.post('/create', upload.single('file'), fromRequest(MemeRequest), MemeController.create);
router.put('/update/:id', fromRequest(UpdateMemeRequest), uuidValidateParams, MemeController.update);

export default router;
