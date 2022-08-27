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
		private credentialsRepository: ICredentialsRepository,
		@inject("HashProvider")
		private hashProvider: IHashProvider,
	) {}

	public async execute({ email, password }: ICreateSession): Promise<any> {
		const user = await this.credentialsRepository.findByEmail(email);

		if (!user) {
			throw new AppError("Incorrect email/password combination.", 401);
		}

		const passwordConfirmed = await this.hashProvider.compareHash(
			password || "",
			user.password,
		);

		if (!passwordConfirmed) {
			throw new AppError("Incorrect email/password combination.", 401);
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
