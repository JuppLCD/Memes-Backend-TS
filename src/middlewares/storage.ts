import multer from 'multer';

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './src/public/storage/imgs');
	},
	filename: function (req, file, cb) {
		const fileName = file.originalname.replace(' ', '_').toLowerCase();
		const newNameFile = `${Date.now()}-${fileName}`;
		cb(null, newNameFile);
	},
});

const upload = multer({ storage });

export default upload;
