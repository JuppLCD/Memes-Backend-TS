export interface UserEntinty {
	uuid: string;
	name: string;
	password: string;
}

export interface UserType {
	uuid: string;
	name: string;
}

export interface UserRepository {
	create: (UserValue: UserEntinty) => Promise<UserType | string>;
	find: (uuid: string) => Promise<UserType | null>;
}

// ! Private Methods UserRepository
// encryptPassword: (password: string) => Promise<string>;
// comparePassword: (password: string, receivedPassword: string) => Promise<boolean>;
// userExist: (name: string) => Promise<boolean>;
// modelToEntity: (model: unknown) => UserEntinty;
