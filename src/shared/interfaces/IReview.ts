export interface IReview {
	id: string;
	pacientId: string;
	psychologistId: string;
	rating: number;
	comment: string | null;
	createdAt: Date;
	updatedAt: Date;
}
