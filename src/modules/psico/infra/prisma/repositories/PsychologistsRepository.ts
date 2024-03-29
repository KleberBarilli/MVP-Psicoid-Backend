import { prisma } from "@shared/prisma";
import { ICreatePsychologist } from "../../../domain/models/ICreatePsychologist";
import { IPsychologistsRepository } from "../../../domain/repositories/IPsychologistsRepository";
import { PsychologistEntity } from "../entities/Psychologist";
import { IUpdatedPsychologist } from "@modules/psico/domain/models/IUpdatedPsychologist";
import { IPagination } from "@shared/infra/http/middlewares/pagination";
import { IPsychologistShortUpdate } from "@modules/psico/domain/models/IPsychologist";
import { ISearch } from "@shared/interfaces/IPagination";
import { ICreateInvite } from "@modules/psico/domain/models/ICreateInvite";
import { CreateInviteResponse } from "@shared/interfaces/types/psico.types";

export class PsychologistsRepository implements IPsychologistsRepository {
	private async makePrismaWhere(search: ISearch): Promise<any> {
		const filters = {
			psicoName: search?.psicoName
				? {
						firstName: {
							contains: search.psicoName,
							mode: "insensitive",
						},
				  }
				: undefined,
			cityName: search?.cityName
				? {
						address: {
							city: {
								contains: search.cityName,
								mode: "insensitive",
							},
						},
				  }
				: undefined,
			approachName: search?.approachName
				? {
						some: {
							name: {
								contains: search.approachName,
								mode: "insensitive",
							},
						},
				  }
				: undefined,
		};

		return {
			office: filters?.cityName,
			profile: filters?.psicoName,
			approaches: filters?.approachName,
		};
	}

	public async create({
		credential,
		profile,
		office,
		resume,
	}: ICreatePsychologist): Promise<PsychologistEntity> {
		return prisma.psychologist.create({
			data: {
				resume,
				status: "UNDER_REVIEW",
				credential: {
					create: {
						...credential,
					},
				},
				profile: {
					create: {
						...profile,
						contact: { create: { ...profile.contact } },
					},
				},
				office: {
					create: {
						...office,
						contact: { create: { ...office.contact } },
						address: { create: { ...office.address } },
					},
				},
			},
		});
	}

	public async findById(integrationId: string): Promise<any> {
		return await prisma.psychologist.findUnique({
			where: { integrationId },
			include: {
				office: { include: { address: true, contact: true } },
				profile: { include: { contact: true } },
				approaches: true,
				reviews: true,
			},
		});
	}
	public update({
		id,
		profile,
		office,
		resume,
	}: IUpdatedPsychologist): Promise<PsychologistEntity> {
		return prisma.psychologist.update({
			where: { id },
			data: {
				resume,
				profile: {
					update: {
						...profile,
						contact: { update: { ...office?.contact } },
					},
				},
				office: {
					update: {
						...office,
						contact: { update: { ...office?.contact } },
						address: { update: { ...office?.address } },
					},
				},
			},
		});
	}
	public async findAll({
		skip,
		take,
		sort,
		order,
		search,
	}: IPagination): Promise<[number, any]> {
		const makeWhere = await this.makePrismaWhere(search);
		return Promise.all([
			prisma.psychologist.count({
				where: makeWhere,
			}),
			prisma.psychologist.findMany({
				include: {
					profile: { include: { contact: true } },
					approaches: true,
					reviews: true,
					office: { include: { address: true } },
				},
				where: makeWhere,
				orderBy: { [sort]: order },
				skip,
				take,
			}),
		]);
	}
	public findAllApproaches({
		skip,
		take,
		sort,
		order,
		filter,
	}: IPagination): Promise<number & any> {
		return Promise.all([
			prisma.therapeuticApproaches.count({ where: { ...filter } }),
			prisma.therapeuticApproaches.findMany({
				where: { ...filter },
				orderBy: { [sort]: order },
				skip,
				take,
				select: { id: true, name: true, description: true },
			}),
		]);
	}
	public findOneApproach(id: number): Promise<{
		id: number;
		name: string;
		description: string | null;
	} | null> {
		return prisma.therapeuticApproaches.findUnique({ where: { id } });
	}
	public addApproach(
		id: number,
		psicoId: number,
	): Promise<IPsychologistShortUpdate> {
		return prisma.psychologist.update({
			where: { id: psicoId },
			data: { approaches: { connect: { id } } },
		});
	}
	public removeApproach(
		id: number,
		psicoId: number,
	): Promise<IPsychologistShortUpdate> {
		return prisma.psychologist.update({
			where: { id: psicoId },
			data: { approaches: { disconnect: { id } } },
		});
	}
	public inviteCustomer({
		name,
		email,
		psychologistId,
		token,
	}: ICreateInvite): Promise<CreateInviteResponse> {
		return prisma.invite.create({
			data: { email, name, psychologistId, token },
			select: {
				name: true,
				email: true,
				token: true,
				psychologist: {
					select: {
						profile: {
							select: { firstName: true, lastName: true },
						},
					},
				},
			},
		});
	}
}
