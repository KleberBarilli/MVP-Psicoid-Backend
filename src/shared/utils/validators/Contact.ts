import { IContact } from "@modules/newsletter/domain/models/IContact";
import * as yup from "yup";

interface IContactForm {
	telephone?: string;
	cellPhone?: string;
	email?: string;
}

export const validateContact = (contact: IContactForm) =>
	yup
		.object()
		.shape({
			telephone: yup.string(),
			cellPhone: yup.string(),
			email: yup
				.string()
				.typeError("EMail inválido")
				.email("Email inválido"),
		})
		.validate(contact, { abortEarly: false, stripUnknown: true });

interface IContactMongo {
	name: string | null;
	email: string;
}
export const validateContactMongo = (contact: IContactMongo) =>
	yup
		.object()
		.shape({
			name: yup.string(),
			email: yup
				.string()
				.typeError("Email inválido")
				.email("Email inválido")
				.required("Email é obrigatório"),
		})
		.validate(contact, { abortEarly: false, stripUnknown: true });
