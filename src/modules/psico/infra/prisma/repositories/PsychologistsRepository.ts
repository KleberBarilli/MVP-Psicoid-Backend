import { PrismaClient } from '@prisma/client';

import { ICreatePsychologist } from '../../../domain/models/ICreatePsychologist';
import { IPsychologistsRepository } from '../../../domain/repositories/IPsychologistsRepository';
import { PsychologistEntity } from '../entities/Psychologist';
import { CredentialEntity } from '@shared/entities/Credential';

export default class PsychologistsRepository
	implements IPsychologistsRepository
{
	#prisma;
	constructor() {
		this.#prisma = new PrismaClient();
	}

	public async create({
		credential,
		identity,
		contact,
		address,
		company,
		resume,
	}: ICreatePsychologist): Promise<PsychologistEntity> {
		return this.#prisma.psychologist.create({
			data: {
				resume,
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
				...(company
					? {
							company: {
								create: {
									...company,
									address: { create: { ...company.address } },
									contact: { create: { ...company.contact } },
								},
							},
					  }
					: {}),
			},
		});
	}

	public async findById(id: string): Promise<PsychologistEntity | null> {
		return await this.#prisma.psychologist.findUnique({
			where: { id },
			include: {
				company: { include: { address: true, contact: true } },
				identity: { include: { address: true, contact: true } },
				approaches: true,
			},
		});
	}
	public async findByEmail(email: string): Promise<CredentialEntity | null> {
		return await this.#prisma.credential.findUnique({ where: { email } });
	}
}
