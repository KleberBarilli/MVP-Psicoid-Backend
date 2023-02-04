export interface IReview {
	id: number;
	customerId: number;
	psychologistId: number;
	rating: string;
	comment: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export interface IListReview {
	count: number;
	IReview: [];
}
