import { Contact } from "@prisma/client";
import { GENDER } from "@shared/utils/enums";

export interface IProfile {
	firstName: string;
	lastName: string;
	cpf: string;
	gender: GENDER;
	avatarUrl: string | null;
	contact: Contact;
}
