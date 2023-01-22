import { IRedisCache } from "@shared/cache/IRedisCache";
import { AppError } from "@shared/errors/AppError";
import { RedisKeys } from "@shared/utils/enums";
import { inject, injectable } from "tsyringe";
import { ICredentialsRepository } from "../domain/repositories/ICredentialsRepository";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
	credentialId: number;
	profileId: number;
	email: string;
	password: string;
}
@injectable()
export class UpdateCredentialsService {
	constructor(
		@inject("CredentialsRepository")
		private credentialsRepository: ICredentialsRepository,
		@inject("HashProvider")
		private hashProvider: IHashProvider,
		@inject("RedisCache") private redisCache: IRedisCache,
	) {}

	public async execute({
		credentialId,
		profileId,
		email,
		password,
	}: IRequest): Promise<void> {
		const user = await this.credentialsRepository.findById(credentialId);

		if (!user) {
			throw new AppError({ message: "Usuário não encontrado" });
		}
		const hashedPassword = await this.hashProvider.generateHash(
			password || "",
		);
		await this.credentialsRepository.updateCredential(credentialId, {
			email,
			password: hashedPassword,
		});
		await this.redisCache.invalidate(`${RedisKeys.ME}:${profileId}`);
	}
}
