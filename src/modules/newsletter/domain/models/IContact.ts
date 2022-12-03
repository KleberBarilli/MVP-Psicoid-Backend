export interface IContact {
	_id: string;
	name: string | null;
	email: string;
	subscribed: boolean;
	createdAt: Date;
	updatedAt: Date;
}
