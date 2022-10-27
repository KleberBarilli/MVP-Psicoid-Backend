import { PrismaClient } from '@prisma/client'
import { ICreatePsychologist } from '../../../domain/models/ICreatePsychologist'
import { IPsychologistsRepository } from '../../../domain/repositories/IPsychologistsRepository'
import { PsychologistEntity } from '../entities/Psychologist'
import { CredentialEntity } from '@shared/entities/Credential'
import { IUpdatePsychologist } from '@modules/psico/domain/models/IUpdatePsychologist'
import { IPagination } from '@shared/infra/http/middlewares/pagination'
import { IPsychologistShortUpdate } from '@modules/psico/domain/models/IPsychologist'
export default class PsychologistsRepository implements IPsychologistsRepository {
	#prisma
	constructor() {
		this.#prisma = new PrismaClient()
	}

	public async create({
		credential,
		profile,
		office,
		resume,
	}: ICreatePsychologist): Promise<PsychologistEntity> {
		return this.#prisma.psychologist.create({
			data: {
				resume,
				status: 'UNDER_REVIEW',
				credential: {
					create: {
						...credential,
					},
				},
				profile: {
					create: {
						...profile,
						contact: { create: { ...profile.contact } },
					},
				},
				office: {
					create: {
						...office,
						contact: { create: { ...office.contact } },
						address: { create: { ...office.address } },
					},
				},
			},
		})
	}

	public async findById(id: string): Promise<any> {
		return await this.#prisma.psychologist.findUnique({
			where: { id },
			include: {
				office: { include: { address: true, contact: true } },
				profile: { include: { contact: true } },
				approaches: true,
				reviews: true,
			},
		})
	}
	public async findByEmail(email: string): Promise<CredentialEntity | null> {
		return await this.#prisma.credential.findUnique({ where: { email } })
	}
	public update(
		id: string,
		{ profile, office, resume }: IUpdatePsychologist,
	): Promise<PsychologistEntity> {
		return this.#prisma.psychologist.update({
			where: { id },
			data: {
				resume,
				profile: {
					update: {
						...profile,
						contact: { update: { ...profile?.contact } },
					},
				},
				office: {
					update: {
						...office,
						contact: { update: { ...office?.contact } },
						address: { update: { ...office?.address } },
					},
				},
			},
		})
	}
	public findAll({ skip, take, sort, order, filter }: IPagination): Promise<number & any> {
		return Promise.all([
			this.#prisma.psychologist.count({ where: { ...filter } }),
			this.#prisma.psychologist.findMany({
				include: {
					profile: { include: { contact: true } },
					approaches: true,
					reviews: true,
					office: { include: { address: true } },
				},
				where: {
					AND: [
						{
							office: { address: { city: { contains: 'Passo Fundo' } } },
							approaches: { every: { name: { contains: 'Nome abordagem' } } },
						},
					],
				},
				orderBy: { [sort]: order },
				skip,
				take,
			}),
		])
	}
	public findAllApproaches({
		skip,
		take,
		sort,
		order,
		filter,
	}: IPagination): Promise<number & any> {
		return Promise.all([
			this.#prisma.therapeuticApproache.count({ where: { ...filter } }),
			this.#prisma.therapeuticApproache.findMany({
				where: { ...filter },
				orderBy: { [sort]: order },
				skip,
				take,
				select: { id: true, name: true, description: true },
			}),
		])
	}
	public findOneApproach(
		id: string,
	): Promise<{ id: string; name: string; description: string | null } | null> {
		return this.#prisma.therapeuticApproache.findUnique({ where: { id } })
	}
	public addApproach(id: string, psicoId: string): Promise<IPsychologistShortUpdate> {
		return this.#prisma.psychologist.update({
			where: { id: psicoId },
			data: { approaches: { connect: { id } } },
		})
	}
	public removeApproach(id: string, psicoId: string): Promise<IPsychologistShortUpdate> {
		return this.#prisma.psychologist.update({
			where: { id: psicoId },
			data: { approaches: { disconnect: { id } } },
		})
	}
}
