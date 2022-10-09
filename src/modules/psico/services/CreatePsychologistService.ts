import { injectable, inject } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { ICreatePsychologist } from "../domain/models/ICreatePsychologist";
import { IPsychologistCreated } from "../domain/models/IPsychologystCreated";
import { IPsychologistsRepository } from "../domain/repositories/IPsychologistsRepository";
import { IHashProvider } from "@modules/auth/providers/HashProvider/models/IHashProvider";
import { getGeocode } from "@shared/lib/geocoder";

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
		office,
		resume,
	}: ICreatePsychologist): Promise<IPsychologistCreated> {
		const userExists = await this.psychologistsRepository.findByEmail(credential.email);
		if (userExists) {
			throw new AppError("User already exists");
		}
		credential.password = await this.hashProvider.generateHash(credential.password || "");

		const location = await getGeocode(
			`${address.number} ${address.street} ${address.neighborhood} ${address.city}`,
		);

		address.latitude = location[0].latitude;
		address.longitude = location[0].longitude;
		return this.psychologistsRepository.create({
			credential,
			identity,
			contact,
			address,
			office,
			resume,
		});
	}
}
