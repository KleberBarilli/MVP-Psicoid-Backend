import { Request, Response } from 'express';
import { validateCredentials } from '../../../../../shared/utils/validators/Credentials';
import { validateAddress } from '../../../../../shared/utils/validators/Address';
import { validateContact } from '../../../../../shared/utils/validators/Contact';
import { validateIdentity } from '../../../../../shared/utils/validators/Identity';
import { validatePsychologist } from '../../../../../shared/utils/validators/Psychologist';
import { validateCompany } from '../../../../../shared/utils/validators/Company';
import { container } from 'tsyringe';
import CreatePsychologistService from '../../../services/CreatePsychologistService';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ValidationError } from 'yup';
import { sendBadRequest } from '../../../../../shared/errors/BadRequest';

export default class PsychologistsController {
	public async create(req: Request, res: Response): Promise<Response> {
		try {
			const {
				psico: {
					credentials,
					types,
					identity,
					contact,
					address,
					company,
				},
			} = req.body;
			credentials.email = credentials.email.toLowerCase();
			await Promise.all([
				validatePsychologist(types),
				validateCredentials(credentials),
				validateIdentity(identity),
				validateContact(contact),
				validateAddress(address),
			]);
			if (company) {
				await validateCompany(company);
			}

			const createPsychologist = container.resolve(
				CreatePsychologistService,
			);
			const user = await createPsychologist.execute({
				credential: credentials,
				types,
				identity,
				contact,
				address,
				company,
			});

			return res.json({
				data: user,
				message: 'Psychologist created with success',
			});
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					return res.status(400).json({
						error: 'Já existe um CPF ou CNPJ igual cadastrado no sistema.',
					});
				}
			}
			if (error instanceof ValidationError) {
				return sendBadRequest(req, res, error.inner);
			}
			return res.status(400).json({ error });
		}
	}
}
