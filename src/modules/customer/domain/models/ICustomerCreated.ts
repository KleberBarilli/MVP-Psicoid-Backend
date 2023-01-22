import { IPagination } from "@shared/infra/http/middlewares/pagination";

export interface ICustomerCreated {
	id: number;
	credentialId: number | null;
	profileId: number | null;
	guestId: number | null;
	createdAt: Date;
	updatedAt: Date;
}

export interface IGetCustomersByPsico {
	psicoId: number;
	pagination: IPagination;
}
