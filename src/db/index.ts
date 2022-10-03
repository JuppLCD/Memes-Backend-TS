import { CONFIG_ENV } from '../config';
import { sequelize } from './sequelize.connect';

// * REMOVE IMAGES IN STORAGE
import fs from 'fs';
import path from 'path';

if (CONFIG_ENV.DB.force) {
	const pathStorage = path.join(__dirname, '../storage');

	const gitIgnoreContent = '* \n !.gitignore\n';

	fs.rmSync(path.join(pathStorage, '/imgs'), { recursive: true, force: true });
	fs.mkdirSync(path.join(pathStorage, '/imgs'));

	fs.writeFileSync(path.join(pathStorage, '/imgs/.gitignore'), gitIgnoreContent);
}

export function DBConnect() {
	return sequelize.sync({ force: CONFIG_ENV.DB.force });
}
