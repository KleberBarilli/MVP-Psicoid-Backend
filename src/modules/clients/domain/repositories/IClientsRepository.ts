import { ICreateClient } from '../models/ICreateClient';
import { IClient } from '../models/IClient';
import { ClientEntity } from '../../infra/prisma/entities/Client';

export interface IClientsRepository {
	create(data: ICreateClient): Promise<ClientEntity>;
	findById(id: string): Promise<IClient | null>;
}
