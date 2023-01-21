export interface IContact {
	_id: bigint;
	name: string | null;
	email: string;
	subscribed: boolean;
	createdAt: Date;
	updatedAt: Date;
}
