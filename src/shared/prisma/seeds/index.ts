import {
	AppointmentStatus,
	BrazilState,
	PrismaClient,
	Role,
} from "@prisma/client";
import { addHours } from "date-fns";
import { randomUUID } from "crypto";
import { numOnly } from "@shared/utils/etc";

import rawPatients from "./json/patients.json";
import rawPsychologists from "./json/psychologists.json";
import rawAppointments from "./json/appointments.json";
import tz from "@config/tz";

const prisma = new PrismaClient();

const insertPatients = async () => {
	const promises = rawPatients.data.map(async p => {
		await prisma.customer.create({
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

	console.log("Patients inserted successfully");
};

const insertPsychologists = async () => {
	const promises = rawPsychologists.data.map(async p => {
		await prisma.psychologist.create({
			data: {
				credential: {
					create: {
						password:
							"$2a$08$vAZ/gwO/gjrbKpuSV526e.oD6Ip.MaNdMNKcbRjZedijpEpRrqTIG",
						email: p.credential.email,
						role: "PSYCHOLOGIST",
						integrationId: randomUUID(),
					},
				},
				profile: {
					create: {
						cpf: numOnly(p.profile.cpf),
						firstName: p.profile.firstName,
						lastName: p.profile.lastName,
						avatarUrl:
							"http://psicologianeza.com/wp-content/uploads/2017/07/diana.jpg",
					},
				},
				office: {
					create: {
						contact: {
							create: {
								telephone: numOnly(p.office.contact.telephone),
								cellPhone: numOnly(p.office.contact.cellPhone),
							},
						},
						address: {
							create: {
								city: p.office.address.city,
								neighborhood: p.office.address.neighborhood,
								street: p.office.address.street,
								zipCode: numOnly(p.office.address.zipCode),
								number: p.office.address.number,
								latitude: Math.random() * 180 - 90,
								longitude: Math.random() * 360 - 180,
								state: p.office.address.state as BrazilState,
							},
						},
						operatingHours: "08:00 as 17:00 segunda a sábado",
						photos: [
							"https://static.wixstatic.com/media/95c9a9_ff168c54743348b7820729729316dbc7~mv2.jpg/v1/fill/w_640,h_426,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/95c9a9_ff168c54743348b7820729729316dbc7~mv2.jpg",
							"https://www.fazfacil.com.br/wp-content/uploads/2022/04/20220428-42-therapist-office-decors-we-adore_-2021-edition.png",
							"https://a-static.mlcdn.com.br/1500x1500/quadro-para-decoracao-escritorio-psicologico-cerebro-podium/lojapodium/10371029907/fa0e23d30b3248f4280ab5c9ad323d3f.jpg",
						],
					},
				},
				resume: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
				approaches: {
					connectOrCreate: p.approaches.map(a => {
						return {
							where: { name: a.name },
							create: {
								name: a.name,
								description: a.description,
							},
						};
					}),
				},
			},
		});
	});

	await Promise.all(promises);

	console.log("Psychologists inserted successfully");
};
const insertAppointments = async () => {
	const promises = rawAppointments.data.map(async a => {
		await prisma.appointment.create({
			data: {
				patient: { connect: { id: a.patientId } },
				psychologist: { connect: { id: a.psychologistId } },
				integrationId: randomUUID(),
				price: a.price,
				createdBy: a.createdBy as Role,
				status: a.status as AppointmentStatus,
				schedule: {
					create: {
						startsAt: addHours(
							new Date(a.schedule.startsAt),
							tz.BRAZIL_TZ,
						),
						endsAt: addHours(
							new Date(a.schedule.endsAt),
							tz.BRAZIL_TZ,
						),
					},
				},
			},
		});
	});

	await Promise.all(promises);

	console.log("Appointments inserted successfully");
};

async function main() {
	await insertPatients();
	await insertPsychologists();
	await insertAppointments();
	prisma.$disconnect();
}

main();
