import { CONFIG_ENV } from '../config';
import { sequelize } from './sequelize.connect';

export function DBConnect() {
	return sequelize.sync({ force: CONFIG_ENV.DB.force });
}
