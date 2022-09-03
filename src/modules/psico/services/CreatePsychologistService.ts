import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import { ICreatePsychologist } from "../domain/models/ICreatePsychologist";
import { IPsychologistCreated } from "../domain/models/IPsychologystCreated";
import { IPsychologistsRepository } from "../domain/repositories/IPsychologistsRepository";
import { IHashProvider } from "@modules/auth/providers/HashProvider/models/IHashProvider";

@injectable()
export default class CreatePsychologistService {
	constructor(
		@inject("PsychologistsRepository")
		public psychologistsRepository: IPsychologistsRepository,
		@inject("HashProvider")
		public hashProvider: IHashProvider,
	) {}
	public async execute({
		credential,
		identity,
		contact,
		address,
		company,
		resume,
	}: ICreatePsychologist): Promise<IPsychologistCreated> {
		const userExists = await this.psychologistsRepository.findByEmail(credential.email);
		if (userExists) {
			throw new AppError("User already exists");
		}
		credential.password = await this.hashProvider.generateHash(credential.password || "");

		return this.psychologistsRepository.create({
			credential,
			identity,
			contact,
			address,
			company,
			resume,
		});
	}
}
