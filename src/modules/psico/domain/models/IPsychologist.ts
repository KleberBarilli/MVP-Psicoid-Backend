import { IAddress } from "@shared/interfaces/IAddress";
import { IReview } from "@shared/interfaces/IReview";

export interface IPsychologist {
	[x: string]: any;
	id: string;
	credentialId: string;
	individualIdentityId: string;
	officeId: string | null;
	resume: string | null;
	createdAt: Date;
	updatedAt: Date;
	distance: number;
	avgRating: number;
	reviews: IReview[];
	address: IAddress;
}

export interface IListPsychologist {
	count: number;
	IPsychologist: [];
}
