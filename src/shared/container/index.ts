import { container } from "tsyringe";
import "@modules/auth/providers";
import { ICustomersRepository } from "@modules/customer/domain/repositories/ICustomersRepository";
import { IPsychologistsRepository } from "@modules/psico/domain/repositories/IPsychologistsRepository";
import { ICredentialsRepository } from "@modules/auth/domain/repositories/ICredentialsRepository";
import { IReviewsRepository } from "@modules/review/domain/repositories/IReviewsRepository";
import { CustomersRepository } from "@modules/customer/infra/prisma/repositories/CustomersRepository";
import { PsychologistsRepository } from "@modules/psico/infra/prisma/repositories/PsychologistsRepository";
import { CredentialsRepository } from "@modules/auth/infra/prisma/repositories/CredentialsRepository";
import { ReviewsRepository } from "@modules/review/infra/prisma/repositories/ReviewsRepository";
import { INotificationsRepository } from "@modules/notification/domain/repositories/INotificationsRepository";
import { NotificationsRepository } from "@modules/notification/infra/prisma/repositories/NotificationsRepository";
import { IAdminsRepository } from "@modules/admin/domain/repositories/IAdminsRepository";
import { AdminsRepository } from "@modules/admin/infra/prisma/repositories/AdminsRepository";
import { IStorageRepository } from "@modules/storage/domain/repositories/IStorageRepository";
import { StorageRepository } from "@modules/storage/infra/mongoose/repositories/FilesRepository";
import { INewslettersRepository } from "@modules/newsletter/domain/repositories/INewslettersRepository";
import { NewslettersRepository } from "@modules/newsletter/infra/mongoose/repositories/NewslettersRepository";
import { RedisCache } from "@shared/cache/RedisCache";
import { IRedisCache } from "@shared/cache/IRedisCache";
import { IAppointmentsRepository } from "@modules/schedule/domain/repositories/IAppointmentsRepository";
import { AppointmentsRepository } from "@modules/schedule/infra/prisma/repositories/AppointmentsRepository";

container.registerSingleton<ICredentialsRepository>(
	"CredentialsRepository",
	CredentialsRepository,
);
container.registerSingleton<ICustomersRepository>(
	"CustomersRepository",
	CustomersRepository,
);
container.registerSingleton<IPsychologistsRepository>(
	"PsychologistsRepository",
	PsychologistsRepository,
);
container.registerSingleton<IReviewsRepository>(
	"ReviewsRepository",
	ReviewsRepository,
);
// container.registerSingleton<IAppointmentsRepository>(
// 	"AppointmentsRepository",
// 	AppointmentsRepository,
// );
container.registerSingleton<INotificationsRepository>(
	"NotificationsRepository",
	NotificationsRepository,
);
container.registerSingleton<IAdminsRepository>(
	"AdminsRepository",
	AdminsRepository,
);
container.registerSingleton<IStorageRepository>(
	"StorageRepository",
	StorageRepository,
);
container.registerSingleton<INewslettersRepository>(
	"NewslettersRepository",
	NewslettersRepository,
);
container.registerSingleton<IAppointmentsRepository>(
	"AppointmentsRepository",
	AppointmentsRepository,
);
container.registerSingleton<IRedisCache>("RedisCache", RedisCache);
