export interface ICreateReview {
	pacientId: string;
	psychologistId: string;
	rating: number;
	comment: string | null;
}
