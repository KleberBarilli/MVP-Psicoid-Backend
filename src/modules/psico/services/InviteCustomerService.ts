import { injectable, inject } from "tsyringe";
import { IPsychologistsRepository } from "../domain/repositories/IPsychologistsRepository";
import authConfig from "@config/auth";
import { Invite } from "@prisma/client";
import { sign, Secret } from "jsonwebtoken";

interface IRequest {
	name: string;
	email: string;
	psychologistId: string;
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

	public async execute({
		name,
		email,
		psychologistId,
	}: IRequest): Promise<Invite> {
		const token = this.signInviteToken(psychologistId);

		return this.psychologistsRepository.inviteCustomer({
			name,
			email,
			psychologistId,
			token,
		});
	}
}
