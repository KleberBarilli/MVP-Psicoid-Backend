export interface IPsychologistCreated {
	id: string;
	credentialId: string;
	individualIdentityId: string;
	companyId: string | null;
	avatar: string | null;
	resume: string | null;
	createdAt: Date;
	updatedAt: Date;
}
