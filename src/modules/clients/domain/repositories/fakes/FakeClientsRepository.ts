import { v4 as uuidv4 } from 'uuid';
import { ICreateClient } from '../../../domain/models/ICreateClient';
import { IClientsRepository } from '../../repositories/IClientsRepository';
import { ClientEntity } from '../../../infra/prisma/entities/Client';
import { ICredential } from 'src/shared/interfaces/ICredential';
import { IClient } from '../../models/IClient';
import { IIdentity } from 'src/shared/interfaces/IIdentity';
import { IContact } from 'src/shared/interfaces/IContact';
import { IAddress } from 'src/shared/interfaces/IAddress';

export class ClientEntityFake {
	id: string;
	credential: ICredential;
	identity: IIdentity;
	contact: IContact;
	address: IAddress;
}
//https://www.prisma.io/docs/guides/testing/unit-testing
class FakeClientsRepository implements IClientsRepository {
	private clients: ClientEntityFake[] = [];

	public async create({
		credential,
		identity,
		contact,
		address,
	}: ICreateClient) {
		const client = new ClientEntityFake();

		client.id = uuidv4();
		client.credential = credential;
		client.identity = identity;
		client.contact = contact;
		client.address = address;

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
