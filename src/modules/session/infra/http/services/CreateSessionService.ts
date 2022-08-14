import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { sign, Secret } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { ICreateSession } from '../../../domain/models/ICreateSession';
import { IHashProvider } from '../../../providers/HashProvider/models/IHashProvider';

@injectable()
class CreateSessionService {
	#prisma;
	constructor(
		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {
		this.#prisma = new PrismaClient();
	}

	public async execute({ email, password }: ICreateSession): Promise<any> {
		const user = await this.#prisma.credential.findUnique({
			where: { email },
		});

		if (!user) {
			throw new AppError('Incorrect email/password combination.', 401);
		}

		const passwordConfirmed = await this.hashProvider.compareHash(
			password || '',
			user.password,
		);

		if (!passwordConfirmed) {
			throw new AppError('Incorrect email/password combination.', 401);
		}

		const token = sign(
			{ profile: user.role },
			authConfig.jwt.secret as Secret,
			{
				subject: user.id,
				expiresIn: authConfig.jwt.expiresIn,
			},
		);

		return {
			user,
			token,
		};
	}
}

export default CreateSessionService;
