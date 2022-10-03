import path from 'path';
import { v4 as uuid } from 'uuid';

import { initializeApp, applicationDefault, ServiceAccount } from 'firebase-admin/app';
import { storage, credential } from 'firebase-admin';

import { CONFIG_ENV } from '../config';

initializeApp({
	credential: credential.cert(CONFIG_ENV.FIREBASE.credential as ServiceAccount),
});
const storageRef = storage().bucket(CONFIG_ENV.FIREBASE.bucket);

export async function uploadFileFirebase(filename: string) {
	const pathFile = path.join(__dirname, '../storage/imgs/', filename);

	return storageRef.upload(pathFile, {
		public: true,
		destination: `${filename}`,
		metadata: {
			firebaseStorageDownloadTokens: uuid(),
		},
	});
}

export async function deleteImageFirebase(filename: string) {
	await storageRef.file(filename).delete();
}
