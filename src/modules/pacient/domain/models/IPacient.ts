export interface IPacient {
	id: string;
	credentialId: string;
	profileId: string;
	selectedPsychologistId: string | null;
	createdAt: Date;
	updatedAt: Date;
}
