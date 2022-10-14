import { inject, injectable } from "tsyringe";
import { sign, Secret } from "jsonwebtoken";
import authConfig from "@config/auth";
import AppError from "@shared/errors/AppError";
import { ICreateSession } from "../domain/models/ICreateSession";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";
import { ICredentialsRepository } from "../domain/repositories/ICredentialsRepository";

@injectable()
class CreateSessionService {
	constructor(
		@inject("CredentialsRepository")
		public credentialsRepository: ICredentialsRepository,
		@inject("HashProvider")
		public hashProvider: IHashProvider,
	) {}

	public async execute({ email, password }: ICreateSession): Promise<any> {
		const user = await this.credentialsRepository.findByEmail(email);

		if (!user) {
			throw new AppError("Usuário não encontrado", 401);
		}
		if (user.inactive) {
			throw new AppError("A conta do usuaŕio está inativa", 403);
		}
		console.log(email, password);
		const passwordConfirmed = await this.hashProvider.compareHash(
			password || "",
			user.password,
		);

		if (!passwordConfirmed) {
			throw new AppError("Email ou senha inválidos", 401);
		}

		const token = sign(
			{ profile: user.role, profileId: user?.psychologist?.id || user?.pacient?.id },
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
