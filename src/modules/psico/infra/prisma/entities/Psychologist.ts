import { Psychologist, Status } from "@prisma/client";

export class PsychologistEntity implements Psychologist {
	id: string;
	credentialId: string;
	individualIdentityId: string;
	officeId: string | null;
	resume: string | null;
	status: Status;
	createdAt: Date;
	updatedAt: Date;
}
