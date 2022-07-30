import { ICreateClient } from '../../../domain/models/ICreateClient';
import { IClientsRepository } from '../../../domain/repositories/IClientsRepository';
import { PrismaClient } from '@prisma/client';
import { ClientEntity } from '../entities/Client';
import { ICredential } from 'src/shared/interfaces/ICredential';
import { CredentialEntity } from '../entities/Credential';
import { resolve } from 'path';

export default class ClientsRepository implements IClientsRepository {
	#prisma;
	constructor() {
		this.#prisma = new PrismaClient();
	}

	public async create({
		credential,
		identity,
		contact,
		address,
	}: ICreateClient): Promise<ClientEntity> {
		//console.log(address);

		return this.#prisma.client.create({
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

	public async findById(id: string): Promise<ClientEntity | null> {
		return await this.#prisma.client.findUnique({ where: { id } });
	}
	public async findByEmail(email: string): Promise<CredentialEntity | null> {
		return await this.#prisma.credential.findUnique({ where: { email } });
	}
}