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
	create: (UserValue: UserEntinty) => Promise<UserType>;
	tokenUser: (uuid: string, email: string) => Promise<UserType | null>;
	credentialsUser: (email: string, password: string) => Promise<UserType | null>;
}
