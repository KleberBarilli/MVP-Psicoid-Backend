export interface IReviewCreated {
	id: number;
	customerId: number;
	psychologistId: number;
	rating: number;
	comment: string | null;
	createdAt: Date;
	updatedAt: Date;
}
