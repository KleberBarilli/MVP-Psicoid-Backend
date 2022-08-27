export const generateRandomNumber = (digit: number): string => {
	return Math.random().toFixed(digit).split(".")[1];
};
