import { PrismaClient } from "@prisma/client";
import { ICredentialsRepository } from "@modules/auth/domain/repositories/ICredentialsRepository";
import { ICredential } from "@shared/interfaces/ICredential";

export default class CredentialsRepository implements ICredentialsRepository {
	#prisma;
	constructor() {
		this.#prisma = new PrismaClient();
	}
	public async findById(id: string): Promise<ICredential | null> {
		return await this.#prisma.credential.findUnique({ where: { id } });
	}
	public async findByEmail(email: string): Promise<ICredential | null> {
		return await this.#prisma.credential.findUnique({ where: { email } });
	}
	public async findByToken(token: string): Promise<ICredential | null> {
		return await this.#prisma.credential.findFirst({
			where: { tokenRecovery: token },
		});
	}
	public updatePassword(id: string, password: string): Promise<ICredential> {
		return this.#prisma.credential.update({
			where: { id },
			data: { password },
		});
	}
	public updateToken(
		id: string,
		tokenRecovery: string,
	): Promise<ICredential> {
		return this.#prisma.credential.update({
			where: { id },
			data: { tokenRecovery },
		});
	}
	public async iAmPsico(id: string): Promise<ICredential | null> {
		return await this.#prisma.credential.findUnique({
			where: { id },
			include: {
				psychologist: {
					include: {
						identity: { include: { address: true, contact: true } },
						company: { include: { address: true, contact: true } },
						approaches: true,
						pacients: true,
					},
				},
			},
		});
	}
	public async iAmPacient(id: string): Promise<ICredential | null> {
		return await this.#prisma.credential.findUnique({
			where: { id },
			include: {
				pacient: {
					include: {
						identity: { include: { address: true, contact: true } },
						psychologists: true,
					},
				},
			},
		});
	}
}
