export interface IReviewCreated {
	id: string
	customerId: string
	psychologistId: string
	rating: number
	comment: string | null
	createdAt: Date
	updatedAt: Date
}
