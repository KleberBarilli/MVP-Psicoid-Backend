import { Request, Response } from 'express';

export const sendBadRequest = (
	req: Request,
	res: Response,
	message: string,
) => {
	return res.status(400).json({
		error: message,
	});
};
