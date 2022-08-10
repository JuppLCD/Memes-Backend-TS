// CREAR
export interface UserValueType {
	uuid: string;
	name: string;
	email: string;
	password: string;
}

// SE ENVIA, (EN CASO DE QUE ALLA DATOS SENCIBLES)
export interface UserType {
	uuid: string;
	email: string;
	name: string;
}

export interface UserUseCaseType {
	create: (UserValue: UserValueType) => Promise<UserType>;
	tokenUser: (uuid: string, email: string) => Promise<UserType | null>;
	credentialsUser: (email: string, password: string) => Promise<UserType | null>;
}
