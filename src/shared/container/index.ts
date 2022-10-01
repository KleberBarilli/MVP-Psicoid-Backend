import { container } from "tsyringe";
import "@modules/auth/providers";
import { IPacientsRepository } from "@modules/pacient/domain/repositories/IPacientsRepository";
import { IPsychologistsRepository } from "@modules/psico/domain/repositories/IPsychologistsRepository";
import { ICredentialsRepository } from "@modules/auth/domain/repositories/ICredentialsRepository";
import { IReviewsRepository } from "@modules/review/domain/repositories/IReviewsRepository";
import PacientsRepository from "@modules/pacient/infra/prisma/repositories/PacientsRepository";
import PsychologistsRepository from "@modules/psico/infra/prisma/repositories/PsychologistsRepository";
import CredentialsRepository from "@modules/auth/infra/prisma/repositories/CredentialsRepository";
import ReviewsRepository from "@modules/review/infra/prisma/repositories/ReviewsRepository";

container.registerSingleton<ICredentialsRepository>("CredentialsRepository", CredentialsRepository);
container.registerSingleton<IPacientsRepository>("PacientsRepository", PacientsRepository);
container.registerSingleton<IPsychologistsRepository>(
	"PsychologistsRepository",
	PsychologistsRepository,
);
container.registerSingleton<IReviewsRepository>("ReviewsRepository", ReviewsRepository);
