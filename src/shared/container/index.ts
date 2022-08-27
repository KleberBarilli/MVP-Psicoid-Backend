import { container } from "tsyringe";

import "@modules/auth/providers";
import { IPacientsRepository } from "@modules/pacients/domain/repositories/IPacientsRepository";
import { IPsychologistsRepository } from "@modules/psico/domain/repositories/IPsychologistsRepository";
import PacientsRepository from "@modules/pacients/infra/prisma/repositories/PacientsRepository";
import PsychologistsRepository from "@modules/psico/infra/prisma/repositories/PsychologistsRepository";

container.registerSingleton<IPacientsRepository>(
	"PacientsRepository",
	PacientsRepository,
);
container.registerSingleton<IPsychologistsRepository>(
	"PsychologistsRepository",
	PsychologistsRepository,
);
