import { PrismaClient } from "@prisma/client";
import { ICreatePsychologist } from "../../../domain/models/ICreatePsychologist";
import { IPsychologistsRepository } from "../../../domain/repositories/IPsychologistsRepository";
import { PsychologistEntity } from "../entities/Psychologist";
import { CredentialEntity } from "@shared/entities/Credential";
import { IUpdatePsychologist } from "@modules/psico/domain/models/IUpdatePsychologist";
import { IPagination } from "@shared/infra/http/middlewares/pagination";

export default class PsychologistsRepository implements IPsychologistsRepository {
	#prisma;
	constructor() {
		this.#prisma = new PrismaClient();
	}

	public async create({
		credential,
		identity,
		contact,
		address,
		office,
		resume,
	}: ICreatePsychologist): Promise<PsychologistEntity> {
		return this.#prisma.psychologist.create({
			data: {
				resume,
				status: "UNDER_REVIEW",
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
				office: {
					create: {
						...office,
						contact: { create: { ...contact } },
						address: { create: { ...address } },
					},
				},
			},
		});
	}

	public async findById(id: string): Promise<PsychologistEntity | null> {
		return await this.#prisma.psychologist.findUnique({
			where: { id },
			include: {
				office: { include: { address: true, contact: true } },
				identity: { include: { address: true, contact: true } },
				approaches: true,
			},
		});
	}
	public async findByEmail(email: string): Promise<CredentialEntity | null> {
		return await this.#prisma.credential.findUnique({ where: { email } });
	}
	public update(
		id: string,
		{ identity, contact, address, office, resume }: IUpdatePsychologist,
	): Promise<PsychologistEntity> {
		return this.#prisma.psychologist.update({
			where: { id },
			data: {
				resume,
				identity: {
					update: {
						...identity,
						contact: { update: { ...contact } },
						address: { update: { ...address } },
					},
				},
				office: {
					update: {
						...office,
						contact: { update: { ...contact } },
						address: { update: { ...address } },
					},
				},
			},
		});
	}
	public findAll({ skip, take, sort, order, filter }: IPagination): Promise<number & any> {
		return Promise.all([
			this.#prisma.psychologist.count({ where: { ...filter } }),
			this.#prisma.psychologist.findMany({
				include: {
					identity: { include: { address: true, contact: true } },
					approaches: true,
				},
				where: { ...filter },
				orderBy: { [sort]: order },
				skip,
				take,
			}),
		]);
	}
}
