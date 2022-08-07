export interface IPsychologistCreated {
	id: string;
	credentialId: string;
	individualIdentityId: string;
	companyId: string | null;
	types: string[];
	createdAt: Date;
	updatedAt: Date;
}
