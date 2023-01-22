import { inject, injectable } from "tsyringe";
import { sign, Secret } from "jsonwebtoken";
import authConfig from "@config/auth";
import { AppError } from "@shared/errors/AppError";
import { ICreateSession } from "../domain/models/ICreateSession";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";
import { ICredentialsRepository } from "../domain/repositories/ICredentialsRepository";
import { ISession } from "../domain/models/ISession";
@injectable()
export class CreateSessionService {
	constructor(
		@inject("CredentialsRepository")
		private credentialsRepository: ICredentialsRepository,
		@inject("HashProvider")
		private hashProvider: IHashProvider,
	) {}

	public async execute({
		email,
		password,
	}: ICreateSession): Promise<ISession> {
		const user = await this.credentialsRepository.findByEmail(email);

		if (!user) {
			throw new AppError({
				message: "Usuário não encontrado",
				statusCode: 401,
			});
		}
		if (user.inactivatedAt) {
			throw new AppError({
				message: "A conta do usuaŕio está inativa",
				statusCode: 403,
			});
		}
		const passwordConfirmed = await this.hashProvider.compareHash(
			password || "",
			user.password,
		);

		if (!passwordConfirmed) {
			throw new AppError({
				message: "Email ou senha inválidos",
				statusCode: 401,
			});
		}

		const token = sign(
			{
				profile: user.role,
				profileId: user?.psychologist?.id || user?.customer?.id,
			},
			authConfig.jwt.secret as Secret,
			{
				subject: user.integrationId,
				expiresIn: authConfig.jwt.expiresIn,
			},
		);
		return {
			user,
			token,
		};
	}
}
