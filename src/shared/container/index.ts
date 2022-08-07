import { container } from 'tsyringe';
import { IClientsRepository } from '../../modules/clients/domain/repositories/IClientsRepository';
import ClientsRepository from '../../modules/clients/infra/prisma/repositories/ClientsRepository';
import '../../modules/auth/providers';
import PsychologistsRepository from '../../modules/psico/infra/prisma/repositories/PsychologistsRepository';
import { IPsychologistsRepository } from '../../modules/psico/domain/repositories/IPsychologistsRepository';

container.registerSingleton<IClientsRepository>(
	'ClientsRepository',
	ClientsRepository,
);
container.registerSingleton<IPsychologistsRepository>(
	'PsychologistsRepository',
	PsychologistsRepository,
);
