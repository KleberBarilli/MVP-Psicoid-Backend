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
import { CreateInviteResponse } from "@shared/interfaces/types/psico.types";

export interface IPsychologistsRepository {
	create(data: ICreatePsychologist): Promise<PsychologistEntity>;
	findById(id: bigint): Promise<IPsychologist | null>;
	findAll(pagination: any): Promise<[number, any]>;
	update(data: IUpdatePsychologist): Promise<PsychologistEntity>;
	findAllApproaches(pagination: any): Promise<ITherapeuticApproache[]>;
	findOneApproach(id: bigint): Promise<ITherapeuticApproache | null>;
	addApproach(id: bigint, psicoId: string): Promise<IPsychologistShortUpdate>;
	removeApproach(
		id: bigint,
		psicoId: string,
	): Promise<IPsychologistShortUpdate>;
	inviteCustomer({
		name,
		email,
		psychologistId,
		token,
	}: ICreateInvite): Promise<CreateInviteResponse>;
}
