import { v4 as uuid } from 'uuid';
import { UserValueType } from './Types';

class UserValue implements UserValueType {
	uuid: string;
	constructor(public name: string, public password: string, public email: string) {
		this.uuid = uuid();
	}
}

export default UserValue;
