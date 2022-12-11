import { injectable, inject } from "tsyringe";
import { IPsychologistsRepository } from "../domain/repositories/IPsychologistsRepository";
import { IRedisCache } from "@shared/cache/IRedisCache";
import { RedisKeys } from "@shared/utils/enums";

@injectable()
export class AddApproachService {
	constructor(
		@inject("PsychologistsRepository")
		private psychologistsRepository: IPsychologistsRepository,
		@inject("RedisCache") private redisCache: IRedisCache,
	) {}

	public async execute(id: string, psicoId: string): Promise<void> {
		await this.psychologistsRepository.addApproach(id, psicoId);
		await this.redisCache.invalidate(`${RedisKeys.ME}:${psicoId}`);
		await this.redisCache.invalidateKeysByPattern(RedisKeys.LIST_PSICO);
	}
}
