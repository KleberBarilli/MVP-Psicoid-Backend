export interface IPacient {
	id: string;
	credentialId: string;
	individualIdentityId: string;
	selectedPsychologistId: string | null;
	createdAt: Date;
	updatedAt: Date;
}
