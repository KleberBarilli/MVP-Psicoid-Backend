import { IRedisCache } from "@shared/cache/IRedisCache";
import { ICredential } from "@shared/interfaces/ICredential";
import { RedisKeys } from "@shared/utils/enums";
import { inject, injectable } from "tsyringe";
import { ICredentialsRepository } from "../domain/repositories/ICredentialsRepository";

interface IRequest {
	credentialId: string;
	profile: string;
	profileId: string;
}
@injectable()
export default class WhoiamService {
	constructor(
		@inject("CredentialsRepository")
		private credentialsRepository: ICredentialsRepository,
		@inject("RedisCache") private redisCache: IRedisCache,
	) {}

	public async execute({
		credentialId,
		profile,
		profileId,
	}: IRequest): Promise<ICredential | null> {
		let user = await this.redisCache.recover<any>(
			`${RedisKeys.ME}:${profileId}`,
		);
		switch (profile) {
			case "CUSTOMER":
				if (!user) {
					user = await this.credentialsRepository.iAmCustomer(
						credentialId,
					);
					await this.redisCache.save(
						`${RedisKeys.ME}:${profileId}`,
						user,
					);
				}

				user.customer.psychologists.map(
					(el: { id: string; selected: boolean }) => {
						if (el.id === user.customer.selectedPsychologistId) {
							el.selected = true;
						}
						return el;
					},
				);

				return user;
			case "PSYCHOLOGIST":
				if (!user) {
					user = await this.credentialsRepository.iAmPsico(
						credentialId,
					);
					await this.redisCache.save(
						`${RedisKeys.ME}:${profileId}`,
						user,
					);
					return user;
				}
				break;
			case "ADMIN":
				if (!user) {
					user = await this.credentialsRepository.iAmAdmin(
						credentialId,
					);
					await this.redisCache.save(
						`${RedisKeys.ME}:${profileId}`,
						user,
					);
					return user;
				}
				break;
			default:
				return null;
		}
		return user;
	}
}
