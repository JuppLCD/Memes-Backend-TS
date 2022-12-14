import { NextFunction, Request, Response } from 'express';
import { MemeUseCaseType, templateMeme, TextsMemeUseCaseType } from './Types';
import MemeValue from './MemeValue';

import Boom from '@hapi/boom';

class MemeController {
	constructor(private MemeUseCase: MemeUseCaseType, private TextsMemeUseCase: TextsMemeUseCaseType) {
		this.MemeUseCase = MemeUseCase;
		this.TextsMemeUseCase = TextsMemeUseCase;
	}

	public create = async (req: Request, res: Response, next: NextFunction) => {
		const data = req.body.dataToken;
		const access = req.body?.access ? req.body?.access.toLowerCase() === 'true' : false;

		const newMemeObj = {
			name: req.body.name,
			access,
			user_id: data.id,
			path_image: `${req.file?.filename}`,
		};
		const template = req.body.template ? (JSON.parse(req.body.template) as templateMeme) : undefined;

		try {
			if (req.file?.filename === undefined) {
				throw Boom.badData();
			}
			const meme = await this.MemeUseCase.create(
				new MemeValue(newMemeObj.name, newMemeObj.access, newMemeObj.user_id, newMemeObj.path_image, template?.url)
			);
			const memeObj = meme.toJSON() as any;

			if (template && template.url && template.texts) {
				const texts_meme = await this.TextsMemeUseCase.create(memeObj.uuid, template);

				memeObj.template = {
					url: memeObj.template,
					texts: texts_meme.map((text) => text.toJSON()),
				};
			}

			res.json(memeObj);
		} catch (err) {
			next(err);
		}
	};

	public updateName = async (req: Request, res: Response, next: NextFunction) => {
		const data = req.body.dataToken;

		const datosCambiar = {
			user_id: data.id,
			name: req.body.name,
			meme_id: req.params.id,
		};

		try {
			const meme = await this.MemeUseCase.updateName(datosCambiar);
			res.json(meme);
		} catch (err) {
			next(err);
		}
	};

	public updateMeme = async (req: Request, res: Response, next: NextFunction) => {
		const data = req.body.dataToken;
		const meme_id = req.params.id;
		const access = req.body?.access ? req.body?.access.toLowerCase() === 'true' : false;

		try {
			if (req.file?.filename === undefined) {
				throw Boom.badData();
			}
			const template = req.body.template ? (JSON.parse(req.body.template) as templateMeme) : undefined;

			const memeToEdit = new MemeValue(req.body.name, access, data.id, `${req.file?.filename}`, template?.url);
			memeToEdit.uuid = meme_id;

			const meme = await this.MemeUseCase.updateMeme(memeToEdit);

			const memeObj = meme.toJSON() as any;

			if (template && template.url) {
				await this.TextsMemeUseCase.deleteTexts(memeObj.uuid);

				let texts_meme: any[] = [];
				if (template.texts) {
					texts_meme = await this.TextsMemeUseCase.create(memeObj.uuid, template);
				}

				memeObj.template = {
					url: memeObj.template,
					texts: texts_meme.map((text) => text.toJSON()),
				};
			}

			res.json(meme);
		} catch (err) {
			next(err);
		}
	};

	public delete = async (req: Request, res: Response, next: NextFunction) => {
		const dataUser = req.body.dataToken;
		const meme_id = req.params.id;
		try {
			const isDeleted = await this.MemeUseCase.delete(meme_id, dataUser.id);

			const statusCode = isDeleted ? 200 : 500;

			res.status(statusCode).end();
		} catch (err) {
			next(err);
		}
	};

	public user = async (req: Request, res: Response, next: NextFunction) => {
		const dataUser = req.body.dataToken;
		try {
			const userMemes = await this.MemeUseCase.user(dataUser.id);
			res.json(userMemes);
		} catch (err) {
			next(err);
		}
	};

	public getMeme = async (req: Request, res: Response, next: NextFunction) => {
		const dataUser = req.body.dataToken;
		const meme_id = req.params.id;
		try {
			const userMeme = await this.MemeUseCase.getMeme(dataUser.id, meme_id);
			res.json(userMeme);
		} catch (err) {
			next(err);
		}
	};

	public publicMemes = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const allPublicMemes = await this.MemeUseCase.publicMemes();
			res.json(allPublicMemes);
		} catch (err) {
			next(err);
		}
	};
}

export default MemeController;
