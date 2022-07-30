import { container } from 'tsyringe';
import { IClientsRepository } from '../../modules/clients/domain/repositories/IClientsRepository';
import ClientsRepository from '../../modules/clients/infra/prisma/repositories/ClientsRepository';
import '../../modules/clients/providers';

container.registerSingleton<IClientsRepository>(
	'ClientsRepository',
	ClientsRepository,
);
