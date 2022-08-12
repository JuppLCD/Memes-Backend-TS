// CREAR
export interface MemeValueType {
	uuid: string;
	name: string;
	access: boolean;
	user_id: string;
	path_image: string;
}

// SE ENVIA, (EN CASO DE QUE ALLA DATOS SENCIBLES)
// export interface MemeType {
// 	uuid: string;
// 	name: string;
// 	access: string;
// 	user_id: string;
// 	path_image: string;
// }

export interface MemeUseCaseType {
	create: (MemeValue: MemeValueType) => Promise<MemeValueType>;
}
