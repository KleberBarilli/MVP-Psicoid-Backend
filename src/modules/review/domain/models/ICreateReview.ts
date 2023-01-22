export interface ICreateReview {
	customerId: bigint;
	psychologistId: bigint;
	rating: number;
	comment: string | null;
}
