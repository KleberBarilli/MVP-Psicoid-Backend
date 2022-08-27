import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { ISendForgotPasswordEmail } from "../domain/models/ISendForgotPasswordEmail";
import { generateRandomNumber } from "@shared/utils/etc";
import { sendEmail } from "@shared/utils/emailBuilder";
import { ICredentialsRepository } from "../domain/repositories/ICredentialsRepository";

@injectable()
export default class SendForgotPasswordEmailService {
	constructor(
		@inject("CredentialsRepository")
		private credentialsRepository: ICredentialsRepository,
	) {}

	public async execute({ email }: ISendForgotPasswordEmail): Promise<void> {
		const user = await this.credentialsRepository.findByEmail(email);

		if (!user) {
			throw new AppError("User does not exists.");
		}

		const tokenRecovery = generateRandomNumber(6);

		await this.credentialsRepository.updateToken(user.id, tokenRecovery);

		await sendEmail(
			email,
			tokenRecovery,
			"no-reply-psicoId@psicoid.com.br",
		);
	}
}
