import { injectable, inject } from "tsyringe";
import { IPsychologistsRepository } from "../domain/repositories/IPsychologistsRepository";
import { RedisKeys } from "@shared/utils/enums";
import { IRedisCache } from "@shared/cache/IRedisCache";
import { IUpdatedPsychologist } from "../domain/models/IUpdatedPsychologist";
import { IOfficeEntity } from "@shared/interfaces/IOffice";
import { IProfile } from "@shared/interfaces/IProfile";
import { numOnly } from "@shared/utils/etc";

interface INormalizeResponse {
	normalized: {
		resume?: string;
		profile: IProfile;
		office: IOfficeEntity;
	};
}
@injectable()
export class UpdatePsychologistService {
	constructor(
		@inject("PsychologistsRepository")
		private psychologistsRepository: IPsychologistsRepository,
		@inject("RedisCache") private redisCache: IRedisCache,
	) {}

	private normalizePsychologist({
		office,
		profile,
		id,
		resume,
	}: IUpdatedPsychologist): INormalizeResponse {
		const { contact, address } = office;

		return {
			normalized: {
				resume,

				office: {
					...office,
					contact: {
						...contact,
						cellPhone: contact.cellPhone
							? numOnly(contact.cellPhone)
							: undefined,
						telephone: contact.telephone
							? numOnly(contact.telephone)
							: undefined,
						email: contact.email
							? contact.email.toLowerCase()
							: undefined,
					},
					address: {
						...address,
						zipCode: numOnly(address.zipCode),
					},
				},
				profile: { ...profile, cpf: numOnly(profile.cpf) },
			},
		};
	}
	public async execute({
		id,
		profile,
		office,
		resume,
	}: IUpdatedPsychologist): Promise<void> {
		const { normalized } = this.normalizePsychologist({
			office,
			resume,
			profile,
			id,
		});
		await this.psychologistsRepository.update({
			id,
			profile: normalized.profile,
			office: normalized.office,
			resume: normalized.resume,
		});

		await this.redisCache.invalidate(`${RedisKeys.ME}:${id}`);
		await this.redisCache.invalidateKeysByPattern(RedisKeys.LIST_PSICO);
	}
}
