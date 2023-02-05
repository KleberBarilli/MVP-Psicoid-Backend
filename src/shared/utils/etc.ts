export const generateRandomNumber = (digit: number): string => {
	return Math.random().toFixed(digit).split(".")[1];
};

export const arrAvg = (arr: number[] = []) =>
	arr.reduce((a, b) => a + b, 0) / arr.length;
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

export const numOnly = (str: string): string => {
	return str.replace(/[^0-9]/g, "");
};
