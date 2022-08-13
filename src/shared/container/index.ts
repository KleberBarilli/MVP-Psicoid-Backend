import { container } from 'tsyringe';
import { IPacientsRepository } from '@modules/pacients/domain/repositories/IPacientsRepository';
import PacientsRepository from '@modules/pacients/infra/prisma/repositories/PacientsRepository';
import '@modules/auth/providers';
import PsychologistsRepository from '@modules/psico/infra/prisma/repositories/PsychologistsRepository';
import { IPsychologistsRepository } from '@modules/psico/domain/repositories/IPsychologistsRepository';

container.registerSingleton<IPacientsRepository>(
	'PacientsRepository',
	PacientsRepository,
);
container.registerSingleton<IPsychologistsRepository>(
	'PsychologistsRepository',
	PsychologistsRepository,
);
