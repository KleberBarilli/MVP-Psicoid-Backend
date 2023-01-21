import { IPagination } from "@shared/infra/http/middlewares/pagination";

export interface ICustomerCreated {
	id: string;
	credentialId: string | null;
	profileId: string | null;
	guestId: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export interface IGetCustomersByPsico {
	psicoId: string;
	pagination: IPagination;
}
