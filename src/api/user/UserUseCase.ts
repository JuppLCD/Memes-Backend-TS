import bcrypt from 'bcrypt';
import Boom from '@hapi/boom';

import { User } from '../../db/sequelize.connect';
import { UserEntinty, UserRepository, UserType } from './UserTypes';

class UserUseCase implements UserRepository {
	public create = async (UserValue: UserEntinty) => {
		try {
			UserValue.password = await this.encryptPassword(UserValue.password);

			const newUser = await User.create({ ...UserValue });

			return this.modelToEntity(newUser);
		} catch (error) {
			throw (error as Error).message === 'Validation error' ? Boom.conflict('User exist') : error;
		}
	};

	public tokenUser = async (uuid: string, email: string) => {
		const user = await User.findOne({ where: { uuid, email } });

		if (!!user) {
			return this.modelToEntity(user);
		}
		return null;
	};

	public credentialsUser = async (email: string, password: string) => {
		const user = await User.findOne({
			where: { email },
		});

		if (!!user) {
			const isValid = await this.comparePassword(password, (user as any).password);
			const userV = isValid ? this.modelToEntity(user) : null;
			return userV;
		}
		return null;
	};

	private async encryptPassword(password: string) {
		const salt = await bcrypt.genSalt(10);
		return await bcrypt.hash(password, salt);
	}
	private async comparePassword(password: string, receivedPassword: string) {
		return await bcrypt.compare(password, receivedPassword);
	}

	private modelToEntity(model: unknown) {
		const toUserEntity = model as UserEntinty;
		return { email: toUserEntity.email, uuid: toUserEntity.uuid } as UserType;
	}
}

export default UserUseCase;
