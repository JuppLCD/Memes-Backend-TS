import { NextFunction, Request, Response } from 'express';
import { UserUseCaseType, UserType } from './Types';
import UserValue from './UserValue';

import Boom from '@hapi/boom';
import Token from '../../utils/Token';

class UserController {
	private userUseCase: UserUseCaseType;
	constructor(userUseCase: UserUseCaseType) {
		this.userUseCase = userUseCase;
	}

	public register = async (req: Request, res: Response, next: NextFunction) => {
		const { name, password, email } = req.body;
		try {
			const user = await this.userUseCase.create(new UserValue(name, password, email));
			const accessToken = Token.creteToken({ id: user.uuid, email: user.email });
			res.json({ accessToken, userInfo: { name: user.name, id: user.uuid } });
		} catch (err) {
			next(err);
		}
	};

	public login = async (req: Request, res: Response, next: NextFunction) => {
		const { password, email, token } = req.body;

		if (!token && !email) {
			throw next(Boom.badData('Invalid data'));
		}

		try {
			if (token) {
				const user = await this.loginToken(token);
				res.json({ userInfo: { name: user.name, id: user.uuid } });
			}
			if (email && email.trim()) {
				const { accessToken, user } = await this.loginCredentials(email, password);
				res.json({ accessToken, userInfo: { name: user.name, id: user.uuid } });
			}
		} catch (err) {
			next(err);
		}
	};

	private loginToken = async (token: string) => {
		const { id, email } = await Token.getDataToken(token);
		const user = await this.userUseCase.tokenUser(id, email);

		if (!user) {
			throw Boom.badData('Invalid data');
		}
		return user;
	};

	private loginCredentials = async (email: string, password: string) => {
		const user = await this.userUseCase.credentialsUser(email, password);

		if (!user) {
			throw Boom.badData('Invalid data');
		}

		user as UserType;
		const accessToken = Token.creteToken({ id: user.uuid, email: user.email });
		return { accessToken, user };
	};
}

export default UserController;
