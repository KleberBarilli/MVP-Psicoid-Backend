import { IApproache } from "@shared/interfaces/IApproache";
import { IOffice } from "@shared/interfaces/IOffice";
import { IReview } from "@shared/interfaces/IReview";

export interface IPsychologist {
	[x: string]: any;
	id: string;
	credentialId: string;
	individualIdentityId: string;
	officeId: string;
	resume: string | null;
	createdAt: Date;
	updatedAt: Date;
	distance: number;
	avgRating: number;
	reviews: IReview[];
	office: IOffice;
	approaches: IApproache[];
}
export interface IPsychologistShortUpdate {
	id: string;
	credentialId: string;
	individualIdentityId: string;
	officeId: string;
	resume: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export interface IListPsychologist {
	count: number;
	IPsychologist: [];
}
