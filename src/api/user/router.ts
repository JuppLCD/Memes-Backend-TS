import { Router } from 'express';

import User_Controller from './UserController';
import User_Use_Case from './UserUseCase';

const router = Router();

const UserUseCase = new User_Use_Case();
const UserController = new User_Controller(UserUseCase);

export default router;
