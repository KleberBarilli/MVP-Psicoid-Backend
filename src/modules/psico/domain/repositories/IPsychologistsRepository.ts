import { ICreatePsychologist } from '../models/ICreatePsychologist'
import { IPsychologist, IPsychologistShortUpdate } from '../models/IPsychologist'
import { PsychologistEntity } from '../../infra/prisma/entities/Psychologist'
import { ICredential } from '@shared/interfaces/ICredential'
import { IUpdatePsychologist } from '../models/IUpdatePsychologist'
import { ITherapeuticApproache } from '@shared/interfaces/IApproache'

export interface IPsychologistsRepository {
	create(data: ICreatePsychologist): Promise<PsychologistEntity>
	findById(id: string): Promise<IPsychologist | null>
	findByEmail(email: string): Promise<ICredential | null>
	findAll(pagination: any): Promise<IPsychologist[]>
	update(id: string, data: IUpdatePsychologist): Promise<PsychologistEntity>
	findAllApproaches(pagination: any): Promise<ITherapeuticApproache[]>
	findOneApproach(id: string): Promise<ITherapeuticApproache | null>
	addApproach(id: string, psicoId: string): Promise<IPsychologistShortUpdate>
	removeApproach(id: string, psicoId: string): Promise<IPsychologistShortUpdate>
}
