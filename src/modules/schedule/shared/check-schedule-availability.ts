import { ScheduleStaticService } from "../services/static/ScheduleStaticService";

interface ICheckAvailability {
	psychologistId: string;
	customerId: string;
	startsAt: Date;
	endsAt: Date;
}
export const checkAvailability = async ({
	psychologistId,
	customerId,
	startsAt,
	endsAt,
}: ICheckAvailability): Promise<void> => {
	const psico = await ScheduleStaticService.psychologistAvailable({
		psychologistId,
		ends: endsAt,
		starts: startsAt,
	});
	const customer = await ScheduleStaticService.customerAvailable({
		customerId,
		ends: endsAt,
		starts: startsAt,
	});

	console.log("ps", psico);
	console.log("CS", customer);
};
