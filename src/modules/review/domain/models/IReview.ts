export interface IReview {
	id: string;
	pacientId: string;
	psychologistId: string;
	rating: string;
	comment: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export interface IListReview {
	count: number;
	IReview: [];
}