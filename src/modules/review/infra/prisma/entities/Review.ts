import { Review } from "@prisma/client";

export class ReviewEntity implements Review {
	id: number;
	integrationId: string;
	customerId: number;
	psychologistId: number;
	rating: number;
	comment: string | null;
	deletedAt: Date | null;
	createdAt: Date;
	updatedAt: Date;
}
