import { Pacient } from "@prisma/client";

export class PacientEntity implements Pacient {
	id: string;
	credentialId: string;
	profileId: string;
	selectedPsychologistId: string | null;
	createdAt: Date;
	updatedAt: Date;
}
