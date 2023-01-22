import { Psychologist, Status } from "@prisma/client";

export class PsychologistEntity implements Psychologist {
	id: bigint;
	integrationId: string;
	credentialId: bigint;
	profileId: bigint;
	officeId: bigint;
	resume: string | null;
	status: Status;
	createdAt: Date;
	updatedAt: Date;
}
