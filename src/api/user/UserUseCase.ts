import bcrypt from 'bcrypt';
import Boom from '@hapi/boom';

import { User } from '../../db/sequelize.connect';
import { UserValueType, UserUseCaseType, UserType } from './Types';
import { UserModel } from '../../models/User';

class UserUseCase implements UserUseCaseType {
	public create = async (UserValue: UserValueType) => {
		UserValue.password = await this.encryptPassword(UserValue.password);
		try {
			const newUser = await User.create({ ...UserValue });

			return this.modelToEntity(newUser);
		} catch (error) {
			throw Boom.conflict('User exist');
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

	private modelToEntity(model: UserModel) {
		return { email: model.email, uuid: model.uuid, name: model.name } as UserType;
	}
}

export default UserUseCase;
