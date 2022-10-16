import { Log, Prisma } from "@prisma/client";

export class LogEntity implements Log {
	id: string;
	method: string;
	route: string;
	psychologistId: string | null;
	pacientId: string | null;
	data: Prisma.JsonValue;
	createdAt: Date;
}
