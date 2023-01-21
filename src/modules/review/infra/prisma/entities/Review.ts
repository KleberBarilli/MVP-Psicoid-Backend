import { Review } from "@prisma/client";

export class ReviewEntity implements Review {
	id: bigint;
	customerId: bigint;
	psychologistId bigint;
	rating: number;
	comment: string | null;
	deletedAt: Date | null;
	createdAt: Date;
	updatedAt: Date;
}
