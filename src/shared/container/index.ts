import { container } from "tsyringe";
import "@modules/auth/providers";
import { IPacientsRepository } from "@modules/pacients/domain/repositories/IPacientsRepository";
import { IPsychologistsRepository } from "@modules/psico/domain/repositories/IPsychologistsRepository";
import PacientsRepository from "@modules/pacients/infra/prisma/repositories/PacientsRepository";
import PsychologistsRepository from "@modules/psico/infra/prisma/repositories/PsychologistsRepository";
import { ICredentialsRepository } from "@modules/auth/domain/repositories/ICredentialsRepository";
import CredentialsRepository from "@modules/auth/infra/prisma/repositories/CredentialsRepository";

container.registerSingleton<ICredentialsRepository>("CredentialsRepository", CredentialsRepository);
container.registerSingleton<IPacientsRepository>("PacientsRepository", PacientsRepository);
container.registerSingleton<IPsychologistsRepository>(
	"PsychologistsRepository",
	PsychologistsRepository,
);
