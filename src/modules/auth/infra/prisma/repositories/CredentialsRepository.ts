import { prisma } from "@shared/prisma";
import { ICredentialsRepository } from "@modules/auth/domain/repositories/ICredentialsRepository";
import {
	ICredential,
	ICredentialResponse,
} from "@shared/interfaces/ICredential";
import { IUpdateCredential } from "@modules/auth/domain/models/IUpdateCredentials";

export class CredentialsRepository implements ICredentialsRepository {
	public async findById(id: number): Promise<ICredential | null> {
		return await prisma.credential.findUnique({ where: { id } });
	}
	public async findByEmail(
		email: string,
	): Promise<ICredentialResponse | null> {
		return await prisma.credential.findUnique({
			where: { email },
			include: {
				customer: { select: { id: true, integrationId: true } },
				psychologist: { select: { id: true, integrationId: true } },
			},
		});
	}
	public async findByToken(token: string): Promise<ICredential | null> {
		return await prisma.credential.findFirst({
			where: { tokenRecovery: token },
		});
	}
	public updatePassword(id: number, password: string): Promise<ICredential> {
		return prisma.credential.update({
			where: { id },
			data: { password },
		});
	}
	public updateToken(
		id: number,
		tokenRecovery: string,
	): Promise<ICredential> {
		return prisma.credential.update({
			where: { id },
			data: { tokenRecovery },
		});
	}
	public async iAmPsico(id: number): Promise<ICredential | null> {
		return await prisma.credential.findUnique({
			where: { id },
			include: {
				psychologist: {
					include: {
						profile: { include: { contact: true } },
						office: { include: { address: true, contact: true } },
						approaches: true,
						customers: {
							include: {
								profile: true,
								guest: { include: { contact: true } },
							},
						},
						appointments: { include: { schedule: true } },
						views: true,
					},
				},
			},
		});
	}
	public async iAmCustomer(id: number): Promise<ICredential | null> {
		return await prisma.credential.findUnique({
			where: { id },
			include: {
				customer: {
					include: {
						profile: { include: { contact: true } },
						psychologists: {
							select: {
								id: true,
								approaches: true,
								profile: { include: { contact: true } },
								resume: true,
							},
						},
						views: true,
						appointments: { include: { schedule: true } },
					},
				},
			},
		});
	}
	public async iAmAdmin(id: number): Promise<ICredential | null> {
		return prisma.credential.findUnique({
			where: { id },
			include: { admin: { include: { profile: true } } },
		});
	}
	public deactivateAccount(id: number): Promise<ICredential> {
		return prisma.credential.update({
			where: { id },
			data: { inactivatedAt: new Date() },
		});
	}
	public updateCredential(
		id: number,
		{ email, password }: IUpdateCredential,
	): Promise<ICredential> {
		return prisma.credential.update({
			where: { id },
			data: { email, password },
		});
	}
}
