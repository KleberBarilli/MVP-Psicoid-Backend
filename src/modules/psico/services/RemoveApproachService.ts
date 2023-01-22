import { injectable, inject } from "tsyringe";
import { IPsychologistsRepository } from "../domain/repositories/IPsychologistsRepository";
import { RedisKeys } from "@shared/utils/enums";
import { IRedisCache } from "@shared/cache/IRedisCache";

@injectable()
export class RemoveApproachService {
	constructor(
		@inject("PsychologistsRepository")
		private psychologistsRepository: IPsychologistsRepository,
		@inject("RedisCache") private redisCache: IRedisCache,
	) {}

	public async execute(id: bigint, psicoId: bigint): Promise<void> {
		await this.psychologistsRepository.removeApproach(id, psicoId);
		await this.redisCache.invalidate(`${RedisKeys.ME}:${psicoId}`);
		await this.redisCache.invalidateKeysByPattern(RedisKeys.LIST_PSICO);
	}
}
