import * as yup from 'yup';
import { PsychologistType } from '@prisma/client';
import { PSICO_TYPES } from '../enums';
interface IPsychologistForm {
	types: PsychologistType;
}

export const validatePsychologistType = (psychologistType: IPsychologistForm) =>
	yup
		.object()
		.shape({
			types: yup.array(yup.string().oneOf(PSICO_TYPES)),
		})
		.validate(psychologistType, { abortEarly: false, stripUnknown: true });
