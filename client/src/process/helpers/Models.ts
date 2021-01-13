export enum Constants {
	STORE = 'STORE',
	TOKEN = 'token',
	USER = 'user'
}

export interface IUser {
	id?: number;
	firstName?: string | null | undefined;
	lastName?: string | null | undefined;
	phone?: string | undefined;
	deviceId?: string | undefined;
	email?: string | null | undefined;
	password?: string | null | undefined;
	newPassword?: string | null | undefined;
	dob?: string | null | undefined;
	role?: 'super' | 'admin' | 'user';
}

