import { injectable, inject } from 'tsyringe'
import { IPsychologistsRepository } from '../domain/repositories/IPsychologistsRepository'

@injectable()
export default class ShowPsychologistService {
	constructor(
		@inject('PsychologistsRepository')
		public psychologistsRepository: IPsychologistsRepository,
	) {}
	public async execute(id: string): Promise<any> {
		return await this.psychologistsRepository.findOneApproach(id)
	}
}
