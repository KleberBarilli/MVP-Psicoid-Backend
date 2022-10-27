export interface ICreateReview {
	customerId: string
	psychologistId: string
	rating: number
	comment: string | null
}
