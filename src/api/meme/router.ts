import express from 'express';

const router = express.Router();

import MemeControllerClass from './Controller';
import MemeUseCaseClass from './UseCase/Meme';
import TextsMemeUseCaseClass from './UseCase/TextsMeme';

const MemeUseCase = new MemeUseCaseClass();
const TextsMemeUseCase = new TextsMemeUseCaseClass();
const MemeController = new MemeControllerClass(MemeUseCase, TextsMemeUseCase);

// Middlewares
import fromRequest from './../../middlewares/fromRequest';
import uuidValidateParams from '../../middlewares/uuidValidateParams';
import authJwt from '../../middlewares/authJwt';

// Validations
import MemeRequest from '../../validations/MemeRequest';
import UpdateMemeRequest from '../../validations/UpdateMemeRequest';
import upload from '../../middlewares/storage';

router.get('/', authJwt, MemeController.user);
router.get('/public', authJwt, MemeController.publicMemes);
router.post('/create', upload.single('file'), fromRequest(MemeRequest), authJwt, MemeController.create);
router.patch('/rename/:id', fromRequest(UpdateMemeRequest), authJwt, uuidValidateParams, MemeController.updateName);
router.put('/update/:id', upload.single('file'), authJwt, uuidValidateParams, MemeController.updateMeme);
router.delete('/delete/:id', authJwt, uuidValidateParams, MemeController.delete);

router.get('/:id', authJwt, uuidValidateParams, MemeController.getMeme);

export default router;
