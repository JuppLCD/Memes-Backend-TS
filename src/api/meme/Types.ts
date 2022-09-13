import { MemeModel } from '../../models/Meme';
import { TextMemeModel } from '../../models/TextMeme';

// CREAR
export interface MemeValueType {
	uuid: string;
	name: string;
	access: boolean;
	user_id: string;
	path_image: string;
	template?: string;
}

export interface textMemeType {
	text: string;
	x: number;
	y: number;
	fs: number;
	id: string;
	color: string;
}
export interface templateMeme {
	url: string;
	texts: textMemeType[];
}

export interface MemeUseCaseType {
	create: (MemeValue: MemeValueType) => Promise<MemeModel>;
	updateName: (MemeToUpdate: { user_id: string; name: any; meme_id: string }) => Promise<MemeModel>;
	updateMeme: (MemeToUpdate: { user_id: string; path_image: string; meme_id: string }) => Promise<MemeModel>;
	delete: (meme_id: string, user_id: string) => Promise<boolean>;
	user: (user_id: string) => Promise<MemeModel[]>;
	publicMemes: () => Promise<MemeModel[]>;
	getMeme: (user_id: string, meme_id: string) => Promise<MemeModel[]>;
}

export interface TextsMemeUseCaseType {
	create: (meme_id: string, template: templateMeme) => Promise<TextMemeModel[]>;
}
