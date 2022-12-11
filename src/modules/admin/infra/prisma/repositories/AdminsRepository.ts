import { prisma } from "@shared/prisma";
import { IAdminCreated } from "@modules/admin/domain/models/IAdminCreated";
import { ICreateAdmin } from "@modules/admin/domain/models/ICreateAdmin";
import { IAdminsRepository } from "@modules/admin/domain/repositories/IAdminsRepository";

export class AdminsRepository implements IAdminsRepository {
	public create({
		credential,
		profile,
	}: ICreateAdmin): Promise<IAdminCreated> {
		return prisma.admin.create({
			data: {
				credential: { create: { ...credential, role: "ADMIN" } },
				profile: {
					create: {
						...profile,
						contact: { create: { ...profile.contact } },
					},
				},
			},
		});
	}
}
