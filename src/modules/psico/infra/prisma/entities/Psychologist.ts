import { Psychologist, Status } from "@prisma/client";

export class PsychologistEntity implements Psychologist {
	id: string;
	credentialId: string;
	profileId: string;
	officeId: string;
	resume: string | null;
	status: Status;
	createdAt: Date;
	updatedAt: Date;
}
