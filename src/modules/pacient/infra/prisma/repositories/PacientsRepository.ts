import { PrismaClient } from "@prisma/client";
import { ICreatePacient } from "../../../domain/models/ICreatePacient";
import { IPacientsRepository } from "../../../domain/repositories/IPacientsRepository";
import { PacientEntity } from "../entities/Pacient";
import { CredentialEntity } from "@shared/entities/Credential";
import { IUpdatePacient } from "@modules/pacient/domain/models/IUpdatePacient";
import { IPacient } from "@modules/pacient/domain/models/IPacient";
import { IPagination } from "@shared/infra/http/middlewares/pagination";

export default class PacientsRepository implements IPacientsRepository {
	#prisma;
	constructor() {
		this.#prisma = new PrismaClient();
	}

	public async create({ credential, profile, contact }: ICreatePacient): Promise<PacientEntity> {
		const { email, password, role } = credential;
		return this.#prisma.pacient.create({
			data: {
				credential: {
					create: {
						email,
						password,
						role,
					},
				},
				profile: {
					create: {
						...profile,
						contact: { create: { ...contact } },
					},
				},
			},
		});
	}

	public async findById(id: string): Promise<PacientEntity | null> {
		return await this.#prisma.pacient.findUnique({
			where: { id },
			include: {
				credential: { select: { email: true } },
				profile: { include: { contact: true } },
				psychologists: true,
			},
		});
	}
	public async findByEmail(email: string): Promise<CredentialEntity | null> {
		return await this.#prisma.credential.findUnique({ where: { email } });
	}
	public update(
		id: string,
		{ profile, contact, selectedPsychologistId }: IUpdatePacient,
	): Promise<PacientEntity> {
		return this.#prisma.pacient.update({
			where: { id },
			data: {
				selectedPsychologistId,
				profile: {
					update: {
						...profile,
						contact: { update: { ...contact } },
					},
				},
			},
		});
	}
	public addPsychologist(
		pacientId: string,
		psicoId: string,
		selectedPsychologistId: string,
	): Promise<IPacient> {
		return this.#prisma.pacient.update({
			where: { id: pacientId },
			data: { psychologists: { connect: { id: psicoId } }, selectedPsychologistId },
		});
	}

	public findAllByPsico(
		psicoId: string,
		{ skip, take, sort, order, filter }: IPagination,
	): Promise<number & any> {
		return Promise.all([
			this.#prisma.pacient.count({
				where: { psychologists: { some: { id: psicoId } }, ...filter },
			}),
			this.#prisma.pacient.findMany({
				where: { psychologists: { some: { id: psicoId } }, ...filter },
				orderBy: { [sort]: order },
				skip,
				take,
				select: { id: true, profile: { include: { contact: true } } },
			}),
		]);
	}
}
