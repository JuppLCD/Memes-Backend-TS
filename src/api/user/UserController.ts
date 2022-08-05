import { NextFunction, Request, Response } from 'express';
import { UserRepository } from './UserTypes';
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
		// ! PROBLEMA, el userUseCase me llega ocmo objeto vacio
		try {
			const user = await this.userUseCase.create(new UserValue(name, password, email));

			if (typeof user === 'string') {
				next(Boom.conflict('User exist'));
				return;
			}

			const accessToken = this.createToken(user.uuid, user.email);
			res.json({ accessToken });
		} catch (err) {
			next(err);
		}
	};

	public login = async (req: Request, res: Response, next: NextFunction) => {
		const { name, password, email, token } = req.body;

		let login;

		if (token) {
			try {
				const data = jwt.verify(token, CONFIG_ENV.ACCESS_TOKEN);
				login = { data };
			} catch (err) {
				next(err);
			}
		} else {
			login = { name, password, email };
		}
		// ! TENGO QUE LOGEAR EL USUARIO
		const user = { uuid: '', email: '' };
		if (typeof user === 'string') {
			return;
		}
		const accessToken = this.createToken(user.uuid, user.email);
		res.json({ accessToken });
	};

	private createToken(id: string, email: string, expiresIn: string = '2 days') {
		const token = jwt.sign({ id, email }, CONFIG_ENV.ACCESS_TOKEN, { expiresIn });
		return token;
	}
}

export default UserController;
