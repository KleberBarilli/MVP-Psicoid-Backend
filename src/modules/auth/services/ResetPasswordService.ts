import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IResetPassword } from "../domain/models/IResetPassword";
import { ICredentialsRepository } from "../domain/repositories/ICredentialsRepository";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";

@injectable()
export class ResetPasswordService {
	constructor(
		@inject("CredentialsRepository")
		private credentialsRepository: ICredentialsRepository,
		@inject("HashProvider")
		private hashProvider: IHashProvider,
	) {}

	public async execute({ token, password }: IResetPassword): Promise<void> {
		const user = await this.credentialsRepository.findByToken(token);

		if (!user) {
			throw new AppError({ message: "Código inválido" });
		}
		const hashedPassword = await this.hashProvider.generateHash(
			password || "",
		);
		await this.credentialsRepository.updatePassword(
			user.id,
			hashedPassword,
		);
	}
}
