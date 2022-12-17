import { injectable, inject } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ICreatePsychologist } from "../domain/models/ICreatePsychologist";
import { IPsychologistCreated } from "../domain/models/IPsychologystCreated";
import { IPsychologistsRepository } from "../domain/repositories/IPsychologistsRepository";
import { IHashProvider } from "@modules/auth/providers/HashProvider/models/IHashProvider";
import { getGeocode } from "@shared/lib/geocoder";
import { ICredentialsRepository } from "@modules/auth/domain/repositories/ICredentialsRepository";
import { ICredentialResponse } from "@shared/interfaces/ICredential";
import { RedisCache } from "@shared/cache/RedisCache";
import { RedisKeys } from "@shared/utils/enums";

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

		await redisCache.invalidateKeysByPattern(RedisKeys.LIST_PSICO);

		return this.psychologistsRepository.create({
			credential,
			profile,
			office,
			resume,
		});
	}
}
