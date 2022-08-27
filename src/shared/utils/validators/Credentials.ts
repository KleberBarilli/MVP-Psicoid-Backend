import { Role } from "@prisma/client";
import * as yup from "yup";
import { ROLE_TYPE } from "../enums";

interface ICredentialForm {
	email: string;
	password: string;
	roles: Role[];
}

export const validateCredentials = (credentials: ICredentialForm) =>
	yup
		.object()
		.shape({
			email: yup
				.string()
				.typeError("E-mail inválido")
				.email("Necessário preencher o campo com um e-mail válido")
				.required("Necessário preencher o campo e-mail"),
			password: yup
				.string()
				.typeError("Senha inválida")
				.required("Necessário preencher o campo senha"),
			roles: yup.array(yup.string().oneOf(ROLE_TYPE)),
		})
		.validate(credentials, { abortEarly: false, stripUnknown: true });

interface ILoginForm {
	email: string;
	password: string;
}

export const validateLogin = (login: ILoginForm) =>
	yup
		.object()
		.shape({
			email: yup
				.string()
				.typeError("E-mail inválido")
				.email("Necessário preencher o campo com um e-mail válido")
				.required("Necessário preencher o campo e-mail"),
			password: yup
				.string()
				.typeError("Senha inválida")
				.min(3, "Senha muito curta")
				.required("Necessário preencher o campo senha"),
		})
		.validate(login, { abortEarly: false, stripUnknown: true });
