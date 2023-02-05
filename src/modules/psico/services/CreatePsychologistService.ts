import { injectable, inject } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ICreatePsychologist } from "../domain/models/ICreatePsychologist";
import { IPsychologistCreated } from "../domain/models/IPsychologistCreated";
import { IPsychologistsRepository } from "../domain/repositories/IPsychologistsRepository";
import { IHashProvider } from "@modules/auth/providers/HashProvider/models/IHashProvider";
import { getGeocode } from "@shared/lib/geocoder";
import { ICredentialsRepository } from "@modules/auth/domain/repositories/ICredentialsRepository";
import {
	ICredential,
	ICredentialResponse,
} from "@shared/interfaces/ICredential";
import { RedisCache } from "@shared/cache/RedisCache";
import { RedisKeys } from "@shared/utils/enums";

import { IProfile } from "@shared/interfaces/IProfile";
import { IOfficeEntity } from "@shared/interfaces/IOffice";
import { numOnly } from "@shared/utils/etc";

interface INormalizeResponse {
	normalized: {
		resume?: string;
		profile: IProfile;
		office: IOfficeEntity;
		credential: ICredential;
	};
}
@injectable()
export class CreatePsychologistService {
	constructor(
		@inject("PsychologistsRepository")
		private psychologistsRepository: IPsychologistsRepository,
		@inject("HashProvider")
		private hashProvider: IHashProvider,
		@inject("CredentialsRepository")
		private credentialsRepository: ICredentialsRepository,
	) {}
	private userExists(email: string): Promise<ICredentialResponse | null> {
		return this.credentialsRepository.findByEmail(email);
	}

	private normalizePsychologist({
		office,
		profile,
		credential,
		resume,
	}: ICreatePsychologist): INormalizeResponse {
		const { contact, address } = office;

		return {
			normalized: {
				resume,
				credential: {
					...credential,
					email: credential.email.toLowerCase(),
				},
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
		credential,
		profile,
		office,
		resume,
	}: ICreatePsychologist): Promise<IPsychologistCreated> {
		const redisCache = new RedisCache();

		const user = await this.userExists(credential.email);
		if (user) {
			throw new AppError({ message: "User already exists" });
		}
		credential.password = await this.hashProvider.generateHash(
			credential.password || "",
		);

		const location = await getGeocode(
			`${office.address.number} ${office.address.street} ${office.address.neighborhood} ${office.address.city}`,
		);

		office.address.latitude = location[0].latitude || 0;
		office.address.longitude = location[0].longitude || 0;

		const { normalized } = this.normalizePsychologist({
			credential,
			office,
			profile,
			resume,
		});

		await redisCache.invalidateKeysByPattern(RedisKeys.LIST_PSICO);

		return this.psychologistsRepository.create({
			credential: normalized.credential,
			profile: normalized.profile,
			office: normalized.office,
			resume: normalized.resume,
		});
	}
}
