import { PrismaClient } from "@prisma/client";
import { ICreatePacient } from "../../../domain/models/ICreatePacient";
import { IPacientsRepository } from "../../../domain/repositories/IPacientsRepository";
import { PacientEntity } from "../entities/Pacient";
import { CredentialEntity } from "@shared/entities/Credential";
import { IUpdatePacient } from "@modules/pacient/domain/models/IUpdatePacient";
import { IPacient } from "@modules/pacient/domain/models/IPacient";

export default class PacientsRepository implements IPacientsRepository {
	#prisma;
	constructor() {
		this.#prisma = new PrismaClient();
	}

	public async create({ credential, identity, contact }: ICreatePacient): Promise<PacientEntity> {
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
				identity: {
					create: {
						...identity,
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
				identity: { include: { contact: true } },
				psychologists: true,
			},
		});
	}
	public async findByEmail(email: string): Promise<CredentialEntity | null> {
		return await this.#prisma.credential.findUnique({ where: { email } });
	}
	public update(
		id: string,
		{ identity, contact, selectedPsychologistId }: IUpdatePacient,
	): Promise<PacientEntity> {
		return this.#prisma.pacient.update({
			where: { id },
			data: {
				selectedPsychologistId,
				identity: {
					update: {
						...identity,
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
}
