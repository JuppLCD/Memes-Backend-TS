import express from 'express';

const router = express.Router();

import UserControllerClass from './Controller';
import UserUseCaseClass from './UserUseCase';

const UserUseCase = new UserUseCaseClass();
const UserController = new UserControllerClass(UserUseCase);

// Middlewares
import fromRequest from './../../middlewares/fromRequest';

// Validations
import RegisterRequest from './../../validations/RegisterRequest';
import LoginRequest from './../../validations/LoginRequest';

router.post('/register', fromRequest(RegisterRequest), UserController.register);
router.post('/login', fromRequest(LoginRequest), UserController.login);

export default router;
