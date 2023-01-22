export interface ICreateReview {
	customerId: number;
	psychologistId: number;
	rating: number;
	comment: string | null;
}
