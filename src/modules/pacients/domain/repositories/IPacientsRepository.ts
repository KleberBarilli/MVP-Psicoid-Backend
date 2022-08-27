import { ICreatePacient } from "../models/ICreatePacient";
import { IPacient } from "../models/IPacient";
import { PacientEntity } from "../../infra/prisma/entities/Pacient";
import { ICredential } from "@shared/interfaces/ICredential";

export interface IPacientsRepository {
	create(data: ICreatePacient): Promise<PacientEntity>;
	findById(id: string): Promise<IPacient | null>;
	findByEmail(email: string): Promise<ICredential | null>;
}
