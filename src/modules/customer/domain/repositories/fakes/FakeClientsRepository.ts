// import { v4 as uuidv4 } from "uuid";
// import { ICredential } from "src/shared/interfaces/ICredential";

// export class PacientEntityFake {
// 	id: number;
// 	credentialId: number;
// 	profileId: number;
// 	createdAt: Date;
// 	updatedAt: Date;
// }
// //https://www.prisma.io/docs/guides/testing/unit-testing
// class FakePacientsRepository {
// 	public pacients: PacientEntityFake[] = [];

// 	public async create({
// 		credentialId,
// 		profileId,
// 		createdAt,
// 		updatedAt,
// 	}: any) {
// 		const pacient = new PacientEntityFake();

// 		pacient.id = uuidv4();
// 		pacient.credentialId = credentialId;
// 		pacient.profileId = profileId;
// 		pacient.createdAt = new Date();
// 		pacient.updatedAt = new Date();
// 		this.pacients.push(pacient);

// 		return pacient;
// 	}

// 	public async findByEmail(email: string): Promise<ICredential | null> {
// 		return null;
// 	}
// 	public async findById(id: number): Promise<IPacient | null> {
// 		return null;
// 	}
// }

// export default FakePacientsRepository;
