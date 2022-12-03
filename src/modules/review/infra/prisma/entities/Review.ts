import { Review } from "@prisma/client";

export class ReviewEntity implements Review {
	id: string;
	customerId: string;
	psychologistId: string;
	rating: number;
	comment: string | null;
	deletedAt: Date | null;
	createdAt: Date;
	updatedAt: Date;
}
