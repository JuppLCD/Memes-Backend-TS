import fs from 'fs';
import { join } from 'path';

export default function (filename: string) {
	const pathIMG = join(__dirname, './../', 'storage/imgs/', filename);
	if (fs.existsSync(pathIMG)) fs.unlinkSync(pathIMG);
}
