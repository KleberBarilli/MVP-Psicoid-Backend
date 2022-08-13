import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ValidationError } from 'yup';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { validateCredentials } from '@shared/utils/validators/Credentials';
import { validateAddress } from '@shared/utils/validators/Address';
import { validateContact } from '@shared/utils/validators/Contact';
import { validateIdentity } from '@shared/utils/validators/Identity';
import { sendBadRequest } from '@shared/errors/BadRequest';

import CreatePacientService from '../../../services/CreatePacientService';

export default class PacientController {
	public async create(req: Request, res: Response): Promise<Response> {
		try {
			const {
				pacient: { credentials, identity, contact, address },
			} = req.body;
			credentials.email = credentials.email.toLowerCase();
			await Promise.all([
				validateCredentials(credentials),
				validateIdentity(identity),
				validateContact(contact),
				validateAddress(address),
			]);

			const createPacient = container.resolve(CreatePacientService);
			const user = await createPacient.execute({
				credential: credentials,
				identity,
				contact,
				address,
			});

			return res.json({
				data: user,
				message: 'Pacient created with success',
			});
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					return res.status(400).json({
						error: 'Já existe um CPF igual cadastrado no sistema.',
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
