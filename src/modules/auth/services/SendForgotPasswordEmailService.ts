import { PrismaClient } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { ISendForgotPasswordEmail } from '../domain/models/ISendForgotPasswordEmail';
import { generateRandomNumber } from '@shared/utils/etc';

export default class SendForgotPasswordEmailService {
	#prisma;
	constructor() {
		this.#prisma = new PrismaClient();
	}

	public async execute({ email }: ISendForgotPasswordEmail): Promise<void> {
		const user = await this.#prisma.credential.findUnique({
			where: { email },
		});

		if (!user) {
			throw new AppError('User does not exists.');
		}

		const tokenRecovery = generateRandomNumber(6);

		await this.#prisma.credential.update({
			where: { email },
			data: { tokenRecovery },
		});
	}
}
