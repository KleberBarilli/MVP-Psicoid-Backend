export interface IUser {
	_id: string;
	name: string;
	email: string;
	password?: string;
	avatar: string;
	created_at: Date;
	updated_at: Date;
	getAvatarUrl(): string | null;
}
