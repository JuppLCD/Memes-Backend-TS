import Boom from '@hapi/boom';

import { v4 as uuid } from 'uuid';

import { TextMeme } from '../../db/sequelize.connect';
import { TextMemeModel } from '../../models/TextMeme';

import { templateMeme, textMemeType, TextsMemeUseCaseType } from './Types';

class TextsMemeUseCase implements TextsMemeUseCaseType {
	public create = async (meme_id: string, template: templateMeme) => {
		const texts = this.refactorTemplateTexts(template.texts, meme_id);

		const textsPromises = texts.map((text) => TextMeme.create({ ...text }));

		const texts_meme = await Promise.all(textsPromises);

		if (!texts_meme) {
			throw Boom.serverUnavailable();
		}
		return texts_meme;
	};

	private refactorTemplateTexts(texts: textMemeType[], meme_id: string) {
		const refactorTexts = texts.map((text) => {
			const { id, ...rest } = text;
			return {
				...rest,
				uuid: uuid(),
				meme_id,
			};
		});

		return refactorTexts as TextMemeModel[];
	}
}

export default TextsMemeUseCase;
