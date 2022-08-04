import { v4 as uuid } from 'uuid';
import { UserEntinty } from './UserTypes';

class UserValue implements UserEntinty {
	uuid: string;
	constructor(public name: string, public password: string) {
		this.uuid = uuid();
	}
}

export default UserValue;
