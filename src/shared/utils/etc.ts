export const generateRandomNumber = (digit: number): string => {
	return Math.random().toFixed(digit).split(".")[1];
};

interface IDateInterval {
	start: Date;
	end: Date;
	date: Date;
}
export const isDateInInterval = ({
	start,
	end,
	date,
}: IDateInterval): boolean =>
	date.valueOf() >= start.valueOf() && date.valueOf() <= end.valueOf();
