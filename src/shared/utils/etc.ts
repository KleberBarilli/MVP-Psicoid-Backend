export const generateRandomNumber = (digit: number): string => {
	return Math.random().toFixed(digit).split(".")[1];
};

export const arrAvg = (arr: number[] = []) => arr.reduce((a, b) => a + b, 0) / arr.length;
