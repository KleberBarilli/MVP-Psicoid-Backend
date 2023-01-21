export interface IReview {
	id: bigint;
	customerId: bigint;
	psychologistId bigint;
	rating: string;
	comment: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export interface IListReview {
	count: number;
	IReview: [];
}
