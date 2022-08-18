import fs from 'fs';
import { join } from 'path';

export default function (...path: string[]) {
	const pathIMG = join(__dirname, './../../', ...path);
	if (fs.existsSync(pathIMG)) fs.unlinkSync(pathIMG);
}
