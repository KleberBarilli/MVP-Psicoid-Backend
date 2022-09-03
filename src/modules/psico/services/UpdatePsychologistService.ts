import { injectable, inject } from "tsyringe";
import { IPsychologistsRepository } from "../domain/repositories/IPsychologistsRepository";
import { IUpdatePsychologist } from "../domain/models/IUpdatePsychologist";
import { PsychologistEntity } from "../infra/prisma/entities/Psychologist";

@injectable()
export default class UpdatePsychologistService {
	constructor(
		@inject("PsychologistsRepository")
		private psychologistsRepository: IPsychologistsRepository,
	) {}
	public async execute(
		id: string,
		{ identity, contact, address, resume }: IUpdatePsychologist,
	): Promise<PsychologistEntity> {
		return await this.psychologistsRepository.update(id, {
			identity,
			contact,
			address,
			resume,
		});
	}
}
