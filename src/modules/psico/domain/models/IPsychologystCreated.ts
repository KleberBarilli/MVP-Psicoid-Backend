export interface IPsychologistCreated {
	id: number;
	credentialId: number;
	profileId: number;
	officeId: number;
	resume: string | null;
	createdAt: Date;
	updatedAt: Date;
}
