import { v4 as uuid } from 'uuid';
import { MemeValueType } from './Types';

class MemeValue implements MemeValueType {
	uuid: string;

	constructor(public name: string, public access: boolean, public user_id: string, public path_image: string) {
		this.uuid = uuid();
	}
}

export default MemeValue;
