import * as yup from 'yup';

interface ICompanyForm {
	cnpj: string;
	name: string;
	tradingName: string;
}

export const validateCompany = (company: ICompanyForm) =>
	yup
		.object()
		.shape({
			cnpj: yup.string().typeError('CNPJ Inválido').required(),
			name: yup.string().required('O nome fantasia é obrigatório'),
			tradingName: yup.string().required('A razão social é obrigatória'),
		})
		.validate(company, { abortEarly: false, stripUnknown: true });
