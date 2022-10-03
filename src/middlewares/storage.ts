import multer from 'multer';
import { v4 as uuid } from 'uuid';

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './src/storage/imgs');
	},
	filename: function (req, file, cb) {
		const fileName = file.originalname.replace(' ', '_').toLowerCase();
		const newNameFile = `${uuid()}-${fileName}`;
		cb(null, newNameFile);
	},
});

const upload = multer({ storage });

// const upload = multer({
// 	storage: multer.memoryStorage(),
// 	limits: {
// 		fileSize: 12 * 1024 * 1024, // no larger than mb, you can change as needed.
// 	},
// });

export default upload;
