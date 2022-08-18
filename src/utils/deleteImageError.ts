import { Request } from 'express';
import deleteImage from './deleteImage';

export default function (req: Request) {
	deleteImage(req.file?.path as string);
}
