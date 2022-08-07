import { ICreatePsychologist } from '../models/ICreatePsychologist';
import { IPsychologist } from '../models/IPsychologist';
import { PsychologistEntity } from '../../infra/prisma/entities/Psychologist';
import { ICredential } from 'src/shared/interfaces/ICredential';

export interface IPsychologistsRepository {
	create(data: ICreatePsychologist): Promise<PsychologistEntity>;
	findById(id: string): Promise<IPsychologist | null>;
	findByEmail(email: string): Promise<ICredential | null>;
}
