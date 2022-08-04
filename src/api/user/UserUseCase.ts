import bcrypt from 'bcrypt';

import { User } from '../../db/sequelize.connect';
import { UserEntinty, UserRepository, UserType } from './UserTypes';

class UserUseCase implements UserRepository {
	// * Create a new User
	public async create(UserValue: UserEntinty) {
		const hasUser = await this.userExist(UserValue.name);
		if (hasUser) {
			return 'User Exist';
		}

		UserValue.password = await this.encryptPassword(UserValue.password);

		const newUser = await User.create({
			name: UserValue.name,
			password: UserValue.password,
			uuid: UserValue.uuid,
		});

		return this.modelToEntity(newUser);
	}

	// * Find a User by uuid
	public async find(uuid: string) {
		const user = await User.findOne({ where: { uuid } });

		if (!!user) {
			return this.modelToEntity(user);
		}
		return null;
	}

	private async userExist(name: string) {
		const userExist = await User.findOne({ where: { name } });
		return !!userExist;
	}

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
