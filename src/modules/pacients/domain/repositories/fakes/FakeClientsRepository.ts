import { v4 as uuidv4 } from "uuid";
import { ICredential } from "src/shared/interfaces/ICredential";
import { IPacient } from "../../models/IPacient";
import { PacientEntity } from "@modules/pacients/infra/prisma/entities/Pacient";

export class PacientEntityFake {
	id: string;
	credentialId: string;
	individualIdentityId: string;
	createdAt: Date;
	updatedAt: Date;
}
//https://www.prisma.io/docs/guides/testing/unit-testing
class FakePacientsRepository {
	private pacients: PacientEntityFake[] = [];

	public async create({
		credentialId,
		individualIdentityId,
		createdAt,
		updatedAt,
	}: PacientEntity) {
		const pacient = new PacientEntityFake();

		pacient.id = uuidv4();
		pacient.credentialId = credentialId;
		pacient.individualIdentityId = individualIdentityId;
		pacient.createdAt = new Date();
		pacient.updatedAt = new Date();
		this.pacients.push(pacient);

		return pacient;
	}

	public async findByEmail(email: string): Promise<ICredential | null> {
		return null;
	}
	public async findById(id: string): Promise<IPacient | null> {
		return null;
	}
}

export default FakePacientsRepository;
