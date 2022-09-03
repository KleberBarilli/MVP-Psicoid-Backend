import { ICreatePsychologist } from "../models/ICreatePsychologist";
import { IPsychologist } from "../models/IPsychologist";
import { PsychologistEntity } from "../../infra/prisma/entities/Psychologist";
import { ICredential } from "@shared/interfaces/ICredential";
import { IUpdatePsychologist } from "../models/IUpdatePsychologist";

export interface IPsychologistsRepository {
	create(data: ICreatePsychologist): Promise<PsychologistEntity>;
	findById(id: string): Promise<IPsychologist | null>;
	findByEmail(email: string): Promise<ICredential | null>;
	update(id: string, data: IUpdatePsychologist): Promise<PsychologistEntity>;
}
