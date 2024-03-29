import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ISendForgotPasswordEmail } from "../domain/models/ISendForgotPasswordEmail";
import { generateRandomNumber } from "@shared/utils/etc";
import { ICredentialsRepository } from "../domain/repositories/ICredentialsRepository";
import { ForgotPasswordTemplate } from "@shared/utils/html-templates/ForgotPasswordTemplate";
import Queue from "@shared/lib/bull/Queue";
@injectable()
export class SendForgotPasswordEmailService {
	constructor(
		@inject("CredentialsRepository")
		private credentialsRepository: ICredentialsRepository,
	) {}

	public async execute({ email }: ISendForgotPasswordEmail): Promise<void> {
		const user = await this.credentialsRepository.findByEmail(email);

		if (!user) {
			throw new AppError({ message: "User does not exists." });
		}

		const tokenRecovery = generateRandomNumber(6);

		await this.credentialsRepository.updateToken(user.id, tokenRecovery);

		await Queue.add("RegistrationMail", {
			recipients: [email],
			subject: "Recuperação de Senha",
			html: ForgotPasswordTemplate.message(tokenRecovery),
		});
	}
}
