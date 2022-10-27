export interface ICustomer {
	id: string
	credentialId: string | null
	profileId: string | null
	guestId: string | null
	selectedPsychologistId: string | null
	createdAt: Date
	updatedAt: Date
}
