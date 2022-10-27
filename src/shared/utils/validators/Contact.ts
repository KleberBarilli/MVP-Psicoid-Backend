import * as yup from 'yup'

interface IContactForm {
	telephone?: string
	cellPhone?: string
	email?: string
}

export const validateContact = (contact: IContactForm) =>
	yup
		.object()
		.shape({
			telephone: yup.string(),
			cellPhone: yup.string(),
			email: yup.string().typeError('EMail inválido').email('Email inválido'),
		})
		.validate(contact, { abortEarly: false, stripUnknown: true })
