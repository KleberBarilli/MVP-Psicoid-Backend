export interface IPsychologist {
	id: string;
	credentialId: string;
	individualIdentityId: string;
	officeId: string | null;
	resume: string | null;
	createdAt: Date;
	updatedAt: Date;
}
