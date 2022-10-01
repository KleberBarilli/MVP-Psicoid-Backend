import { ICreatePacient } from "../models/ICreatePacient";
import { IPacient } from "../models/IPacient";
import { PacientEntity } from "../../infra/prisma/entities/Pacient";
import { ICredential } from "@shared/interfaces/ICredential";
import { IUpdatePacient } from "../models/IUpdatePacient";

export interface IPacientsRepository {
	create(data: ICreatePacient): Promise<PacientEntity>;
	findById(id: string): Promise<IPacient | null>;
	findByEmail(email: string): Promise<ICredential | null>;
	update(id: string, data: IUpdatePacient): Promise<PacientEntity>;
	addPsychologist(
		pacientId: string,
		psicoId: string,
		selectedPsychologistId: string,
	): Promise<IPacient>;
}
