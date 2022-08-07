import jwt from 'jsonwebtoken';
import { CONFIG_ENV } from '../config';

interface TokenDataType {
	id: string;
	email: string;
}

class Token {
	static creteToken({ id, email }: TokenDataType, expiresIn: string = '2 days') {
		const token = jwt.sign({ id, email }, CONFIG_ENV.ACCESS_TOKEN, { expiresIn });
		return token;
	}

	static getDataToken = async (token: string) => {
		const data: TokenDataType = (await jwt.verify(token, CONFIG_ENV.ACCESS_TOKEN)) as TokenDataType;
		return data;
	};
}

export default Token;
