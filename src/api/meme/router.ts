import express, { Request } from 'express';

const router = express.Router();

import MemeControllerClass from './MemeController';
import MemeUseCaseClass from './MemeUseCase';

const MemeUseCase = new MemeUseCaseClass();
const MemeController = new MemeControllerClass(MemeUseCase);

// Middlewares
import fromRequest from './../../middlewares/fromRequest';
import uuidValidateParams from '../../middlewares/uuidValidateParams';
import authJwt from '../../middlewares/authJwt';

// Validations
import MemeRequest from '../../validations/MemeRequest';
import UpdateMemeRequest from '../../validations/UpdateMemeRequest';

import upload from '../../utils/storage';

router.get('/', authJwt, MemeController.user);
router.get('/public', authJwt, MemeController.publicMemes);
router.post('/create', upload.single('file'), fromRequest(MemeRequest), authJwt, MemeController.create);
router.put('/update/:id', fromRequest(UpdateMemeRequest), authJwt, uuidValidateParams, MemeController.update);
router.delete('/delete/:id', authJwt, uuidValidateParams, MemeController.delete);

export default router;
