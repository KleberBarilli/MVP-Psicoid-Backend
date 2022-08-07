import { ICreatePsychologist } from '../../../domain/models/ICreatePsychologist';
import { IPsychologistsRepository } from '../../../domain/repositories/IPsychologistsRepository';
import { PrismaClient } from '@prisma/client';
import { PsychologistEntity } from '../entities/Psychologist';
import { CredentialEntity } from '../../../../../shared/entities/Credential';

export default class PsychologistsRepository
	implements IPsychologistsRepository
{
	#prisma;
	constructor() {
		this.#prisma = new PrismaClient();
	}

	public async create({
		credential,
		types,
		identity,
		contact,
		address,
		company,
	}: ICreatePsychologist): Promise<PsychologistEntity> {
		return this.#prisma.psychologist.create({
			data: {
				credential: {
					create: {
						...credential,
					},
				},
				types,
				identity: {
					create: {
						...identity,
						contact: { create: { ...contact } },
						address: { create: { ...address } },
					},
				},
				...(company
					? {
							company: { create: { ...company } },
					  }
					: {}),
			},
		});
	}

	public async findById(id: string): Promise<PsychologistEntity | null> {
		return await this.#prisma.psychologist.findUnique({ where: { id } });
	}
	public async findByEmail(email: string): Promise<CredentialEntity | null> {
		return await this.#prisma.credential.findUnique({ where: { email } });
	}
}
