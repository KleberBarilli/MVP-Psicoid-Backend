import * as yup from 'yup';
import { IUser } from '../domain/models/IUser';

// const validarCadastro = (schema: any) => {
// 	const validaCampos = yup.object().shape({
// 		email: yup
// 			.string()
// 			.typeError('E-mail inválido')
// 			.email('Necessário preencher o campo com um e-mail válido')
// 			.required('Necessário preencher o campo e-mail'),
// 		senha: yup
// 			.string()
// 			.typeError('Senha inválida')
// 			.min(8, 'Senha muito curta, digite pelo menos 8 caracteres')
// 			.minNumbers(1, 'A senha deve conter ao menos um número')
// 			.minLowercase(1, 'A senha deve conter ao menos uma letra minúscula')
// 			.minUppercase(1, 'A senha deve conter ao menos uma letra maiúscula')
// 			.minSymbols(1, 'A senha deve conter ao menos um caracter especial')
// 			.required('Necessário preencher o campo senha'),
// 		confirmacaoSenha: yup
// 			.string()
// 			.typeError('Senha inválida')
// 			.oneOf([yup.ref('senha')], 'As senhas devem corresponder')
// 			.required('Confirme a senha'),
// 	});

export const validarCadastro = (body: any) => {
	const validaCampos = yup.object().shape({
		name: yup.string().required(),
		email: yup.string().email().required(),
		password: yup
			.string()
			.typeError('Senha inválida')
			.min(8, 'Senha muito curta, digite pelo menos 8 caracteres')
			.required('Necessário preencher o campo senha'),
	});

	return validaCampos.validate(body, {
		abortEarly: false,
		stripUnknown: true,
	});
};
