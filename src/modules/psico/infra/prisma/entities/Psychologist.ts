import { Psychologist, Status } from "@prisma/client";

export class PsychologistEntity implements Psychologist {
	id: number;
	integrationId: string;
	credentialId: number;
	profileId: number;
	officeId: number;
	resume: string | null;
	status: Status;
	createdAt: Date;
	updatedAt: Date;
}
