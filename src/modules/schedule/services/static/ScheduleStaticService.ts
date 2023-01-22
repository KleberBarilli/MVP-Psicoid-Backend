import { AppError } from "@shared/errors/AppError";
import { prisma } from "@shared/prisma";
import { isDateInInterval } from "@shared/utils/etc";

interface IPsicoRequest {
	starts: Date;
	ends: Date;
	psychologistId: number;
}

interface ICustomerRequest {
	starts: Date;
	ends: Date;
	customerId: number;
}

export class ScheduleStaticService {
	public static async psychologistAvailable({
		psychologistId,
		starts,
		ends,
	}: IPsicoRequest) {
		const psicoSchedule = await prisma.appointment.findMany({
			where: { psychologistId, closedAppointment: null },
			select: { startsAt: true, endsAt: true },
		});
		psicoSchedule.map(item => {
			if (
				isDateInInterval({
					date: starts,
					start: item.startsAt,
					end: item.endsAt,
				}) ||
				isDateInInterval({
					date: ends,
					start: item.startsAt,
					end: item.endsAt,
				})
			) {
				throw new AppError({
					message: "Não há disponibilidade nesse horário",
					statusCode: 409,
				});
			}
		});
	}

	public static async customerAvailable({
		customerId,
		starts,
		ends,
	}: ICustomerRequest) {
		const customerSchedule = await prisma.appointment.findMany({
			where: { customerId, closedAppointment: null },
			select: { startsAt: true, endsAt: true },
		});
		customerSchedule.map(item => {
			if (
				isDateInInterval({
					date: starts,
					start: item.startsAt,
					end: item.endsAt,
				}) ||
				isDateInInterval({
					date: ends,
					start: item.startsAt,
					end: item.endsAt,
				})
			) {
				throw new AppError({
					message:
						"O paciente não possui disponibilidade nesse horário",
					statusCode: 409,
				});
			}
		});
	}
}
