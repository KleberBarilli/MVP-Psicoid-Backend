import { ICredential } from '@shared/interfaces/ICredential'
import { IProfile } from '@shared/interfaces/IProfile'
import { IOffice } from '@shared/interfaces/IOffice'

export interface ICreatePsychologist {
	credential: ICredential
	profile: IProfile
	office: IOffice
	resume?: string
}
