import { AppError } from "@shared/errors/AppError";
import { HTTP_STATUS_CODE } from "@shared/utils/enums";
import { inject, injectable } from "tsyringe";
import { ICreateUnsub } from "../domain/models/ICreateUnsub";
import { INewslettersRepository } from "../domain/repositories/INewslettersRepository";
import { ContactDocument } from "../infra/mongoose/entities/Contact";
import { UnsubDocument } from "../infra/mongoose/entities/Unsub";

@injectable()
export class UnsubscribeContactService {
	constructor(
		@inject("NewslettersRepository")
		private repo: INewslettersRepository,
	) {}
	private unsub({
		userId,
		email,
		reason,
	}: ICreateUnsub): Promise<UnsubDocument> {
		return this.repo.createUnsub({ userId, email, reason });
	}

	public async execute(
		email: string,
		reason: string | null,
	): Promise<ContactDocument> {
		const contact = await this.repo.findContactByEmail(email);

		if (!contact) {
			throw new AppError({
				message: "Usuário não encontrado",
				statusCode: HTTP_STATUS_CODE.CONFLICT,
			});
		}
		await this.unsub({ userId: contact._id, email, reason });

		return this.repo.unsubscribe(email);
	}
}
