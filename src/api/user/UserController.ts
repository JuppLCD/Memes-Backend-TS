import { Request, Response } from 'express';
import { UserRepository } from './UserTypes';
import UserValue from './UserValue';

class UserController {
	constructor(private userUseCase: UserRepository) {}

	public async register(req: Request, res: Response) {
		const { name, password } = req.body;
		const user = this.userUseCase.create(new UserValue(name, password));

		if (typeof user === 'string') {
			// ERROR USUARIO EXISTE
			return;
		}

		res.send(user);
	}
}

export default UserController;
