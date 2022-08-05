import bcrypt from 'bcrypt';
import Boom from '@hapi/boom';

import { User } from '../../db/sequelize.connect';
import { UserEntinty, UserRepository, UserType } from './UserTypes';

class UserUseCase implements UserRepository {
	// * Create a new User
	public create = async (UserValue: UserEntinty) => {
		try {
			UserValue.password = await this.encryptPassword(UserValue.password);

			const newUser = await User.create({
				name: UserValue.name,
				email: UserValue.email,
				password: UserValue.password,
				uuid: UserValue.uuid,
			});

			return this.modelToEntity(newUser);
		} catch (error) {
			throw (error as Error).message === 'Validation error' ? Boom.conflict('User exist') : error;
		}
	};

	// * Find a User by uuid
	public find = async (uuid: string) => {
		const user = await User.findOne({ where: { uuid } });

		if (!!user) {
			return this.modelToEntity(user);
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
		return { name: toUserEntity.name, uuid: toUserEntity.uuid } as UserType;
	}
}

export default UserUseCase;
