import { Request, Response } from 'express';
import { validateCredentials } from '../../../../../shared/utils/validators/Credentials';
import { validateAddress } from '../../../../../shared/utils/validators/Address';
import { validateContact } from '../../../../../shared/utils/validators/Contact';
import { validateIdentity } from '../../../../../shared/utils/validators/Identity';
import { container } from 'tsyringe';
import CreateClientService from '../../../services/CreateClientService';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ValidationError } from 'yup';
import { sendBadRequest } from '../../../../../shared/errors/BadRequest';

export default class ClientsController {
	public async create(req: Request, res: Response): Promise<Response> {
		try {
			const {
				client: { credentials, identity, contact, address },
			} = req.body;
			credentials.email = credentials.email.toLowerCase();
			await Promise.all([
				validateCredentials(credentials),
				validateIdentity(identity),
				validateContact(contact),
				validateAddress(address),
			]);

			const createClient = container.resolve(CreateClientService);
			const user = await createClient.execute({
				credential: credentials,
				identity,
				contact,
				address,
			});

			return res.json({
				data: user,
				message: 'Client created with success',
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
