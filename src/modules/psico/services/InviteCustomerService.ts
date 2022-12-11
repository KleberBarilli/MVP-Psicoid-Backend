import { injectable, inject } from "tsyringe";
import { IPsychologistsRepository } from "../domain/repositories/IPsychologistsRepository";
import authConfig from "@config/auth";
import { sign, Secret } from "jsonwebtoken";
import Queue from "@shared/lib/bull/Queue";
import { CreateInviteResponse } from "@shared/interfaces/types/psico.types";

interface IRequest {
	name: string;
	email: string;
	psychologistId: string;
}

interface ISendEmailRequest {
	name: string;
	email: string;
	token: string;
	psicoName: string;
}

@injectable()
export class InviteCustomerService {
	constructor(
		@inject("PsychologistsRepository")
		private psychologistsRepository: IPsychologistsRepository,
	) {}

	private signInviteToken(psychologistId: string): string {
		const token = sign(
			{
				invitedBy: psychologistId,
			},
			authConfig.jwt.secret as Secret,
			{
				expiresIn: "30d",
			},
		);
		return token;
	}

	private sendInviteEmail({
		name,
		email,
		token,
		psicoName,
	}: ISendEmailRequest) {
		return Queue.add("SendMail", {
			recipients: [email],
			subject: "Você foi convidado para acessar o app PsicoId",
			html: `<p>Olá ${name}, você foi convidado por ${psicoName}. Use o Link abaixo para se cadastrar: ${token}</p>`,
		});
	}

	public async execute({
		name,
		email,
		psychologistId,
	}: IRequest): Promise<CreateInviteResponse> {
		const token = this.signInviteToken(psychologistId);

		const invite = await this.psychologistsRepository.inviteCustomer({
			name,
			email,
			psychologistId,
			token,
		});

		await this.sendInviteEmail({
			email,
			name,
			token,
			psicoName:
				invite.psychologist.profile.firstName +
				" " +
				invite.psychologist.profile.lastName,
		});

		return invite;
	}
}
