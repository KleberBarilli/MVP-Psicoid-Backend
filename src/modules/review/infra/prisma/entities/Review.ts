import { Review } from "@prisma/client";

export class ReviewEntity implements Review {
	id: string;
	pacientId: string;
	psychologistId: string;
	rating: number;
	comment: string | null;
	createdAt: Date;
	updatedAt: Date;
}
