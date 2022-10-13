import { injectable, inject } from "tsyringe";

import { ICreatePacient } from "../domain/models/ICreatePacient";
import { IPacientCreated } from "../domain/models/IPacientCreated";
import { IPacientsRepository } from "../domain/repositories/IPacientsRepository";
import { IHashProvider } from "@modules/auth/providers/HashProvider/models/IHashProvider";
import AppError from "@shared/errors/AppError";

@injectable()
export default class CreatePacientService {
	constructor(
		@inject("PacientsRepository")
		public pacientsRepository: IPacientsRepository,
		@inject("HashProvider")
		public hashProvider: IHashProvider,
	) {}
	public async execute({
		credential,
		identity,
		contact,
	}: ICreatePacient): Promise<IPacientCreated> {
		const userExists = await this.pacientsRepository.findByEmail(credential.email);
		if (userExists) {
			throw new AppError("User already exists");
		}
		credential.password = await this.hashProvider.generateHash(credential.password || "");

		return await this.pacientsRepository.create({
			credential,
			identity,
			contact,
		});
	}
}
