export interface IReview {
	id: string
	customerId: string
	psychologistId: string
	rating: number
	comment: string | null
	createdAt: Date
	updatedAt: Date
}
