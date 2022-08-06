import { NextFunction, Request, Response } from 'express';
import { UserRepository, UserType } from './UserTypes';
import UserValue from './UserValue';

import jwt from 'jsonwebtoken';
import { CONFIG_ENV } from '../../config';

import Boom from '@hapi/boom';

class UserController {
	private userUseCase: UserRepository;
	constructor(userUseCase: UserRepository) {
		this.userUseCase = userUseCase;
	}

	public register = async (req: Request, res: Response, next: NextFunction) => {
		const { name, password, email } = req.body;
		try {
			const user = await this.userUseCase.create(new UserValue(name, password, email));
			const accessToken = this.createToken(user.uuid, user.email);
			res.json({ accessToken });
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
				const data: { id: string; email: string } = (await jwt.verify(token, CONFIG_ENV.ACCESS_TOKEN)) as {
					id: string;
					email: string;
				};
				const user = await this.userUseCase.tokenUser(data.id, data.email);

				if (!user) {
					throw next(Boom.badData('Invalid data'));
				}

				res.status(200).end();
			}
			if (email && email.trim()) {
				const user = await this.userUseCase.credentialsUser(email, password);

				if (!user) {
					throw next(Boom.badData('Invalid data'));
				}

				const accessToken = this.createToken((user as UserType).uuid, (user as UserType).email);
				res.json({ accessToken });
			}
		} catch (err) {
			next(err);
		}
	};

	private createToken(id: string, email: string, expiresIn: string = '2 days') {
		const token = jwt.sign({ id, email }, CONFIG_ENV.ACCESS_TOKEN, { expiresIn });
		return token;
	}
}

export default UserController;
