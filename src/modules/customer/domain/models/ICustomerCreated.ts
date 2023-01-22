import { IPagination } from "@shared/infra/http/middlewares/pagination";

export interface ICustomerCreated {
	id: bigint;
	credentialId: bigint | null;
	profileId: bigint | null;
	guestId: bigint | null;
	createdAt: Date;
	updatedAt: Date;
}

export interface IGetCustomersByPsico {
	psicoId: bigint;
	pagination: IPagination;
}
