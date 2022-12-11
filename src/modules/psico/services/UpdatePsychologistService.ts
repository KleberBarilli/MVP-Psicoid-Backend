import { injectable, inject } from "tsyringe";
import { IPsychologistsRepository } from "../domain/repositories/IPsychologistsRepository";
import { RedisKeys } from "@shared/utils/enums";
import { IRedisCache } from "@shared/cache/IRedisCache";
import { IProfile } from "@shared/interfaces/IProfile";
import { IOffice } from "@shared/interfaces/IOffice";

interface IRequest {
	psicoId: string;
	profile: IProfile | null;
	office: IOffice | null;
	resume: string | null;
}
@injectable()
export class UpdatePsychologistService {
	constructor(
		@inject("PsychologistsRepository")
		private psychologistsRepository: IPsychologistsRepository,
		@inject("RedisCache") private redisCache: IRedisCache,
	) {}
	public async execute({
		psicoId,
		profile,
		office,
		resume,
	}: IRequest): Promise<void> {
		await this.psychologistsRepository.update({
			id: psicoId,
			profile,
			office,
			resume,
		});

		await this.redisCache.invalidate(`${RedisKeys.ME}:${psicoId}`);
		await this.redisCache.invalidateKeysByPattern(RedisKeys.LIST_PSICO);
	}
}
