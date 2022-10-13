import { Contact } from "@prisma/client";
import { GENDER } from "@shared/utils/enums";

export interface IIdentity {
	firstName: string;
	lastName: string;
	cpf: string;
	gender: GENDER;
	avatarUrl: string | null;
	contact: Contact;
}
