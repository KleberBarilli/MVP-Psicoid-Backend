export interface IPsychologistCreated {
	id: bigint;
	credentialId: bigint;
	profileId: bigint;
	officeId: bigint;
	resume: string | null;
	createdAt: Date;
	updatedAt: Date;
}
