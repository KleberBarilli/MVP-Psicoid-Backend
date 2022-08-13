import { ICreatePacient } from '../../../domain/models/ICreatePacient';
import { IPacientsRepository } from '../../../domain/repositories/IPacientsRepository';
import { PrismaClient } from '@prisma/client';
import { PacientEntity } from '../entities/Pacient';
import { CredentialEntity } from '@shared/entities/Credential';

export default class PacientsRepository implements IPacientsRepository {
	#prisma;
	constructor() {
		this.#prisma = new PrismaClient();
	}

	public async create({
		credential,
		identity,
		contact,
		address,
	}: ICreatePacient): Promise<PacientEntity> {
		return this.#prisma.pacient.create({
			data: {
				credential: {
					create: {
						...credential,
					},
				},
				identity: {
					create: {
						...identity,
						contact: { create: { ...contact } },
						address: { create: { ...address } },
					},
				},
			},
		});
	}

	public async findById(id: string): Promise<PacientEntity | null> {
		return await this.#prisma.pacient.findUnique({ where: { id } });
	}
	public async findByEmail(email: string): Promise<CredentialEntity | null> {
		return await this.#prisma.credential.findUnique({ where: { email } });
	}
}
