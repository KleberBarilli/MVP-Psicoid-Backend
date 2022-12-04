import { ICreatePsychologist } from "../models/ICreatePsychologist";
import {
	IPsychologist,
	IPsychologistShortUpdate,
} from "../models/IPsychologist";
import { PsychologistEntity } from "../../infra/prisma/entities/Psychologist";
import { IUpdatePsychologist } from "../models/IUpdatePsychologist";
import { ITherapeuticApproache } from "@shared/interfaces/IApproache";
import { ICreateInvite } from "../models/ICreateInvite";
import { Invite } from "@prisma/client";

export interface IPsychologistsRepository {
	create(data: ICreatePsychologist): Promise<PsychologistEntity>;
	findById(id: string): Promise<IPsychologist | null>;
	findAll(pagination: any): Promise<IPsychologist[]>;
	update(id: string, data: IUpdatePsychologist): Promise<PsychologistEntity>;
	findAllApproaches(pagination: any): Promise<ITherapeuticApproache[]>;
	findOneApproach(id: string): Promise<ITherapeuticApproache | null>;
	addApproach(id: string, psicoId: string): Promise<IPsychologistShortUpdate>;
	removeApproach(
		id: string,
		psicoId: string,
	): Promise<IPsychologistShortUpdate>;
	inviteCustomer({ name, email }: ICreateInvite): Promise<Invite>;
}
