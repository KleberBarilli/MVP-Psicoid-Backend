import AppError from '../../../shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { ICreatePsychologist } from '../domain/models/ICreatePsychologist';
import { IPsychologistCreated } from '../domain/models/IPsychologystCreated';
import { IPsychologistsRepository } from '../domain/repositories/IPsychologistsRepository';
import { IHashProvider } from '../../auth/providers/HashProvider/models/IHashProvider';

@injectable()
export default class CreatePsychologistService {
	constructor(
		@inject('PsychologistsRepository')
		private psychologistsRepository: IPsychologistsRepository,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}
	public async execute({
		credential,
		types,
		identity,
		contact,
		address,
		company,
	}: ICreatePsychologist): Promise<IPsychologistCreated> {
		const userExists = await this.psychologistsRepository.findByEmail(
			credential.email,
		);
		if (userExists) {
			throw new AppError('User already exists');
		}
		credential.password = await this.hashProvider.generateHash(
			credential.password || '',
		);

		return await this.psychologistsRepository.create({
			credential,
			types,
			identity,
			contact,
			address,
			company,
		});
	}
}
