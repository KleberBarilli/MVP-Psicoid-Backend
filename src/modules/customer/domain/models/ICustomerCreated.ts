export interface ICustomerCreated {
	id: string
	credentialId: string | null
	profileId: string | null
	guestId: string | null
	createdAt: Date
	updatedAt: Date
}
