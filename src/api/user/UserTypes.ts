export interface UserEntinty {
	uuid: string;
	name: string;
	email: string;
	password: string;
}

export interface UserType {
	uuid: string;
	email: string;
	name: string;
}

export interface UserRepository {
	create: (UserValue: UserEntinty) => Promise<UserType | string>;
	find: (uuid: string) => Promise<UserType | null>;
}
