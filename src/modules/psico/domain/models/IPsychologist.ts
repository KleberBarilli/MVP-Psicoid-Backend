export interface IPsychologist {
	[x: string]: any;
	//map(arg0: (el: any) => void): unknown;
	id: string;
	credentialId: string;
	individualIdentityId: string;
	officeId: string | null;
	resume: string | null;
	createdAt: Date;
	updatedAt: Date;

	//distance: number;
}

export interface IListPsychologist {
	count: number;
	IPsychologist: [];
}
