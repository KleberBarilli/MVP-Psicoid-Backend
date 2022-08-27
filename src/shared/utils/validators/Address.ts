import * as yup from "yup";

import { BRAZIL_STATES } from "../enums";

interface IAddressForm {
	zipCode: string;
	street: string;
	neighborhood: string;
	number: string;
	complement?: string;
	city: string;
	state: string;
}

export const validateAddress = (address: IAddressForm) =>
	yup
		.object()
		.shape({
			zipCode: yup
				.string()
				.typeError("CEP inválido")
				.matches(/^\d{5}-\d{3}$/, "CEP inválido")
				.typeError("CEP inválido")
				.min(9, "CEP muito curto, digite ao menos 9 caracteres")
				.required("Necessário preencher o campo CEP"),
			street: yup.string().required("Necessário preencher o nome da rua"),
			number: yup.string(),
			complement: yup.string(),
			neighborhood: yup.string(),
			city: yup.string().required("Necessário preencher a cidade"),
			state: yup
				.string()
				.typeError("Estado inválido")
				.oneOf(BRAZIL_STATES)
				.required("Necessário preencher o estado"),
		})
		.validate(address, { abortEarly: false, stripUnknown: true });
