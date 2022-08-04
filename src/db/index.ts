import { sequelize } from './sequelize.connect';

export function DBConnect() {
	return sequelize.sync({ force: false });
}
