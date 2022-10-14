import { Pacient } from "@prisma/client";

export class PacientEntity implements Pacient {
	id: string;
	credentialId: string | null;
	profileId: string | null;
	guestId: string | null;
	selectedPsychologistId: string | null;
	createdAt: Date;
	updatedAt: Date;
}
