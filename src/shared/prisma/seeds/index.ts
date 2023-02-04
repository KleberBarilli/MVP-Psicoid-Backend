import { PrismaClient } from "@prisma/client";

import rawPatients from "./json/patients.json";
import * as psychologists from "./json/psychologists.json";
import * as approaches from "./json/approaches.json";
import { randomUUID } from "crypto";
import { numOnly } from "@shared/utils/etc";

const prisma = new PrismaClient();

const insertPatients = async () => {
	const promises = rawPatients.data.map(p => {
		prisma.customer.create({
			data: {
				credential: {
					create: {
						password:
							"$2a$08$vAZ/gwO/gjrbKpuSV526e.oD6Ip.MaNdMNKcbRjZedijpEpRrqTIG",
						email: p.credential.email,
						role: "CUSTOMER",
						integrationId: randomUUID(),
					},
				},
				profile: {
					create: {
						cpf: numOnly(p.profile.cpf),
						firstName: p.profile.firstName,
						lastName: p.profile.lastName,
						contact: {
							create: {
								cellPhone: numOnly(p.profile.contact.telephone),
								email: numOnly(p.profile.contact.email),
							},
						},
					},
				},
			},
		});
	});

	await Promise.all(promises);
};

insertPatients()
	.then(() => {
		console.log("Seed patients inserted successfully");
		prisma.$disconnect();
	})
	.catch(error => {
		console.error(error);
		prisma.$disconnect();
	});
