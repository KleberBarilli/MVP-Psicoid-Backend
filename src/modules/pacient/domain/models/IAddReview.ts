export interface IAddReview {
	pacientId: string;
	psychologistId: string;
	rating: number;
	comment: string | null;
}
