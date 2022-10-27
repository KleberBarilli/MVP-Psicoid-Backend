import * as yup from 'yup'
import { cpf } from 'cpf-cnpj-validator'
import { GENDER } from '../enums'
interface IProfileForm {
	firstName: string
	lastName: string
	cpf: string
}

export const validateProfile = (profile: IProfileForm) =>
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
			gender: yup.string().oneOf(Object.values(GENDER)),
		})
		.validate(profile, { abortEarly: false, stripUnknown: true })

export const validateUpdateProfile = (profile: IProfileForm) =>
	yup
		.object()
		.shape({
			firstName: yup.string(),
			lastName: yup.string(),
			cpf: yup.string().test({
				test: v => !v || cpf.isValid(v),
				message: 'CPF Inválido',
			}),
		})
		.validate(profile, { abortEarly: false, stripUnknown: true })
