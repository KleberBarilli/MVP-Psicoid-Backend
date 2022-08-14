import * as yup from 'yup';
import { cpf } from 'cpf-cnpj-validator';
interface IIdentityForm {
	firstName: string;
	lastName: string;
	cpf: string;
}

export const validateIdentity = (identity: IIdentityForm) =>
	yup
		.object()
		.shape({
			firstName: yup.string().required('O nome é obrigatório'),
			lastName: yup.string().required('O sobrenome é obrigatório'),
			cpf: yup
				.string()
				.test({
					test: v => !v || cpf.isValid(v),
					message: 'CPF Inválido',
				})
				.required('O CPF é obrigatório'),
		})
		.validate(identity, { abortEarly: false, stripUnknown: true });
