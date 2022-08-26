import { PrismaClient } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IResetPassword } from '../domain/models/IResetPassword';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

@injectable()
export default class SendForgotPasswordEmailService {
	#prisma;
	constructor(
		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {
		this.#prisma = new PrismaClient();
	}

	public async execute({ token, password }: IResetPassword): Promise<void> {
		const user = await this.#prisma.credential.findFirst({
			where: { tokenRecovery: token },
		});

		if (!user) {
			throw new AppError('Código inválido');
		}
		const hashedPassword = await this.hashProvider.generateHash(
			password || '',
		);
		await this.#prisma.credential.update({
			where: { id: user.id },
			data: { password: hashedPassword },
		});
	}
}
