import * as yup from 'yup';

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
			cpf: yup.string().typeError('CPF Inválido').required(),
		})
		.validate(identity, { abortEarly: false, stripUnknown: true });
