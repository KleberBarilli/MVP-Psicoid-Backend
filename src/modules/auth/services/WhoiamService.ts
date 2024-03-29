import { IRedisCache } from "@shared/cache/IRedisCache";
import { ICredential } from "@shared/interfaces/ICredential";
import { RedisKeys, ROLE_TYPE } from "@shared/utils/enums";
import { inject, injectable } from "tsyringe";
import { ICredentialsRepository } from "../domain/repositories/ICredentialsRepository";

interface IRequest {
	credentialId: number;
	profile: string;
	profileId: number;
}
@injectable()
export class WhoiamService {
	constructor(
		@inject("CredentialsRepository")
		private credentialsRepository: ICredentialsRepository,
		@inject("RedisCache") private redisCache: IRedisCache,
	) {}

	private async iamCustomer(id: number, profileId: number) {
		let user: any;
		user = await this.credentialsRepository.iAmCustomer(id);
		user.customer.psychologists.map(
			(el: { id: number; selected: boolean }) => {
				if (el.id === user.customer.selectedPsychologistId) {
					el.selected = true;
				}
				return el;
			},
		);
		await this.redisCache.save(`${RedisKeys.ME}:${profileId}`, user);
		return user;
	}

	private async iamPsico(id: number, profileId: number) {
		const psico = await this.credentialsRepository.iAmPsico(id);
		await this.redisCache.save(`${RedisKeys.ME}:${profileId}`, psico);
		return psico;
	}

	private async iamAdmin(id: number, profileId: number) {
		const admin = await this.credentialsRepository.iAmAdmin(id);
		await this.redisCache.save(`${RedisKeys.ME}:${profileId}`, admin);
		return admin;
	}

	public async execute({
		credentialId,
		profile,
		profileId,
	}: IRequest): Promise<ICredential | null> {
		let userInCache = await this.redisCache.recover<any>(
			`${RedisKeys.ME}:${profileId}`,
		);
		if (userInCache) {
			return userInCache;
		}

		switch (profile) {
			case ROLE_TYPE.customer:
				return this.iamCustomer(credentialId, profileId);
			case ROLE_TYPE.psychologist:
				return this.iamPsico(credentialId, profileId);
			case ROLE_TYPE.admin:
				return this.iamAdmin(credentialId, profileId);
			default:
				return null;
		}
	}
}
