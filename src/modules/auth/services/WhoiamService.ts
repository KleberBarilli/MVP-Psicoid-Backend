import { PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";

@injectable()
export default class WhoiamService {
	#prisma;
	constructor() {
		this.#prisma = new PrismaClient();
	}

	public async execute(id: string, role: string): Promise<any> {
		if (role === "PACIENT") {
			return await this.#prisma.credential.findUnique({
				where: { id },
				include: {
					pacient: {
						include: {
							identity: {
								include: { address: true, contact: true },
							},
						},
					},
				},
			});
		}
		if (role === "PSYCHOLOGIST") {
			return await this.#prisma.credential.findUnique({
				where: { id },
				include: {
					psychologist: {
						include: {
							company: {
								include: { address: true, contact: true },
							},
							identity: {
								include: { address: true, contact: true },
							},
							pacients: true,
						},
					},
				},
			});
		}
	}
}
