import { IContact } from '@shared/interfaces/IContact'
import { IProfile } from '@shared/interfaces/IProfile'

export interface IUpdateCustomer {
	selectedPsychologistId: string | null
	profile: IProfile
	contact: IContact
}
