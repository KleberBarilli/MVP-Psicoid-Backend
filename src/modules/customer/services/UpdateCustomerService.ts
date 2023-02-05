import { injectable, inject } from "tsyringe";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { IUpdateCustomer } from "../domain/models/IUpdateCustomer";
import { RedisKeys } from "@shared/utils/enums";
import { IRedisCache } from "@shared/cache/IRedisCache";
import { numOnly } from "@shared/utils/etc";
import { IContact } from "@shared/interfaces/IContact";
import { IProfile } from "@shared/interfaces/IProfile";

interface INormalizeRequest {
	contact: IContact;
	profile: IProfile;
}
interface INormalizeResponse {
	normalized: {
		contact: IContact;
		profile: IProfile;
	};
}
@injectable()
export class UpdateCustomerService {
	constructor(
		@inject("CustomersRepository")
		private customersRepository: ICustomersRepository,
		@inject("RedisCache") private redisCache: IRedisCache,
	) {}

	private normalizeCustomer({
		profile,
		contact,
	}: INormalizeRequest): INormalizeResponse {
		return {
			normalized: {
				profile: {
					...profile,
					cpf: numOnly(profile.cpf),
				},
				contact: {
					email: contact.email?.toLowerCase(),
					telephone: contact.telephone
						? numOnly(contact.telephone)
						: undefined,
					cellPhone: contact.cellPhone
						? numOnly(contact.cellPhone)
						: undefined,
				},
			},
		};
	}
	public async execute({
		id,
		profile,
		contact,
		selectedPsychologistId,
	}: IUpdateCustomer): Promise<void> {
		const { normalized } = this.normalizeCustomer({ profile, contact });
		await this.customersRepository.update({
			id,
			selectedPsychologistId,
			profile: normalized.profile,
			contact: normalized.contact,
		});
		await this.redisCache.invalidate(`${RedisKeys.ME}:${id}`);
		await this.redisCache.invalidateKeysByPattern(
			RedisKeys.PSICO_LIST_CUSTOMERS,
		);
	}
}
