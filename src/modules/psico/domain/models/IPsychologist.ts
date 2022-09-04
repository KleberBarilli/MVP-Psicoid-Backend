export interface IPsychologist {
	id: string;
	credentialId: string;
	individualIdentityId: string;
	companyId: string | null;
	officeId: string | null;
	resume: string | null;
	createdAt: Date;
	updatedAt: Date;
}
