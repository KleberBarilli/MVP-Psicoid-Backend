export interface IReview {
	id: bigint;
	customerId: bigint;
	psychologistId bigint;
	rating: number;
	comment: string | null;
	createdAt: Date;
	updatedAt: Date;
}
