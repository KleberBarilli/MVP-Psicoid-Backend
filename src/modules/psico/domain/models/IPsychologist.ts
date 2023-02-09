import { IPagination } from "@shared/infra/http/middlewares/pagination";
import { IApproaches } from "@shared/interfaces/IApproaches";
import { IOffice } from "@shared/interfaces/IOffice";
import { IReview } from "@shared/interfaces/IReview";

export interface IPsychologist {
	[x: string]: any;
	id: number;
	credentialId: number;
	profileId: number;
	officeId: number;
	resume: string | null;
	createdAt: Date;
	updatedAt: Date;
	distance: number;
	avgRating: number;
	reviews: IReview[];
	office: IOffice;
	approaches: IApproaches[];
}
export interface IPsychologistShortUpdate {
	id: number;
	credentialId: number;
	profileId: number;
	officeId: number;
	resume: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export interface IListPsychologist {
	count: number;
	IPsychologist: [];
}

export interface IGetPsicos {
	profileId: number;
	pagination: IPagination;
}
