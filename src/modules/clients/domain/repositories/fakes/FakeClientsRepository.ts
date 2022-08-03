import { v4 as uuidv4 } from 'uuid';
import { ICreateClient } from '../../../domain/models/ICreateClient';
import { IClientsRepository } from '../../repositories/IClientsRepository';
import { ICredential } from 'src/shared/interfaces/ICredential';
import { IClient } from '../../models/IClient';
import { IIdentity } from 'src/shared/interfaces/IIdentity';
import { IContact } from 'src/shared/interfaces/IContact';
import { IAddress } from 'src/shared/interfaces/IAddress';
import { ClientEntity } from 'src/modules/clients/infra/prisma/entities/Client';

export class ClientEntityFake {
	id: string;
	credentialId: string;
	individualIdentityId: string;
	createdAt: Date;
	updatedAt: Date;
}
//https://www.prisma.io/docs/guides/testing/unit-testing
class FakeClientsRepository {
	private clients: ClientEntityFake[] = [];

	public async create({
		credentialId,
		individualIdentityId,
		createdAt,
		updatedAt,
	}: ClientEntity) {
		const client = new ClientEntityFake();

		client.id = uuidv4();
		client.credentialId = credentialId;
		client.individualIdentityId = individualIdentityId;
		client.createdAt = new Date();
		client.updatedAt = new Date();
		this.clients.push(client);

		return client;
	}

	public async findByEmail(email: string): Promise<ICredential | null> {
		return null;
	}
	public async findById(id: string): Promise<IClient | null> {
		return null;
	}
}

export default FakeClientsRepository;
