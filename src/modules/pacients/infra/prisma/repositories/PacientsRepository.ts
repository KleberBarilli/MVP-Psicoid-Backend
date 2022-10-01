import { PrismaClient } from "@prisma/client";
import { ICreatePacient } from "../../../domain/models/ICreatePacient";
import { IPacientsRepository } from "../../../domain/repositories/IPacientsRepository";
import { PacientEntity } from "../entities/Pacient";
import { CredentialEntity } from "@shared/entities/Credential";
import { IUpdatePacient } from "@modules/pacients/domain/models/IUpdatePacient";
import { IPacient } from "@modules/pacients/domain/models/IPacient";

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
						address: { create: { ...address } },
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
				identity: { include: { address: true, contact: true } },
				psychologists: true,
			},
		});
	}
	public async findByEmail(email: string): Promise<CredentialEntity | null> {
		return await this.#prisma.credential.findUnique({ where: { email } });
	}
	public update(
		id: string,
		{ identity, contact, address, selectedPsychologistId }: IUpdatePacient,
	): Promise<PacientEntity> {
		return this.#prisma.pacient.update({
			where: { id },
			data: {
				selectedPsychologistId,
				identity: {
					update: {
						...identity,
						contact: { update: { ...contact } },
						address: { update: { ...address } },
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
