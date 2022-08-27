import * as yup from "yup";
import { cnpj } from "cpf-cnpj-validator";
interface ICompanyForm {
	cnpj: string;
	name: string;
	tradingName: string;
}

export const validateCompany = (company: ICompanyForm) =>
	yup
		.object()
		.shape({
			cnpj: yup
				.string()
				.test({
					test: v => !v || cnpj.isValid(v),
					message: "CNPJ Inválido",
				})
				.required("O CNPJ é obrigatório"),
			name: yup.string().required("O nome fantasia é obrigatório"),
			tradingName: yup.string().required("A razão social é obrigatória"),
		})
		.validate(company, { abortEarly: false, stripUnknown: true });
