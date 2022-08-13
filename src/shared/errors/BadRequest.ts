import { Request, Response } from 'express';
import { ValidationError } from 'yup';

export const sendBadRequest = (
	req: Request,
	res: Response,
	message: ValidationError[],
) => {
	return res.status(400).json({
		error: message,
	});
};
