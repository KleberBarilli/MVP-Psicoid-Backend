import { injectable, inject } from "tsyringe";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import Queue from "@shared/lib/bull/Queue";
import { TypeNotification } from "@prisma/client";
import {
	HTTP_STATUS_CODE,
	NOTIFICATION_MESSAGE,
	RedisKeys,
} from "@shared/utils/enums";
import { ISelectPsychologist } from "../domain/models/ISelectPsychologist";
import { AppError } from "@shared/errors/AppError";
import { IRedisCache } from "@shared/cache/IRedisCache";

@injectable()
export class SelectPsychologistService {
	constructor(
		@inject("CustomersRepository")
		private customersRepository: ICustomersRepository,
		@inject("RedisCache") private redisCache: IRedisCache,
	) {}

	private notify(customerId: string, psychologistId: string) {
		return Queue.add("CreateNotification", {
			type: TypeNotification.CUSTOMER_ADD_PSICO,
			data: {
				customerId,
				psychologistId,
				message: NOTIFICATION_MESSAGE.CUSTOMER_SELECT_PSICO,
			},
			views: { psychologistId },
		});
	}
	public async execute({
		customerId,
		psychologistId,
	}: ISelectPsychologist): Promise<void> {
		const customer = await this.customersRepository.findById(customerId);

		const isPsicoFav = customer?.psychologists.some(
			(psico: { id: bigint }) => psico.id === psychologistId,
		);

		if (!isPsicoFav) {
			throw new AppError({
				message:
					"Não pode selecionar um psicologo que voce não favoritou",
				statusCode: HTTP_STATUS_CODE.CONFLICT,
			});
		}

		await this.customersRepository.selectPsychologist(
			customerId,
			psychologistId,
		);
		await this.notify(customerId, psychologistId);

		await this.redisCache.invalidate(`${RedisKeys.ME}:${customerId}`);
		await this.redisCache.invalidate(`${RedisKeys.ME}:${psychologistId}`);
	}
}
