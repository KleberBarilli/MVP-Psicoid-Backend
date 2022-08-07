import * as yup from 'yup';
import { PsychologistType } from '@prisma/client';
import { PSICO_TYPES } from '../enums';
interface IPsychologistForm {
	types: PsychologistType;
}

export const validatePsychologyst = (psychologyst: IPsychologistForm) =>
	yup
		.object()
		.shape({
			types: yup.array(yup.string().oneOf(PSICO_TYPES)),
		})
		.validate(psychologyst, { abortEarly: false, stripUnknown: true });
