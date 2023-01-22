export interface IContact {
	_id: number;
	name: string | null;
	email: string;
	subscribed: boolean;
	createdAt: Date;
	updatedAt: Date;
}
