export interface IPsychologist {
	id: string;
	credentialId: string;
	individualIdentityId: string;
	companyId?: string;
	types: string[];
	createdAt: Date;
	updatedAt: Date;
}
