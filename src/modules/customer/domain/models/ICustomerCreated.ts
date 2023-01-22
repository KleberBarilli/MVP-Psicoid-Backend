import { IPagination } from "@shared/infra/http/middlewares/pagination";

export interface ICustomerCreated {
	id: bigint;
	credentialId: string | null;
	profileId: bigint | null;
	guestId: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export interface IGetCustomersByPsico {
	psicoId bigint;
	pagination: IPagination;
}
