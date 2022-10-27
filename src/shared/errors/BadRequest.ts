import { Request, Response } from 'express'

export const sendBadRequest = (req: Request, res: Response, message: string, status: number) => {
	return res.status(status || 400).json({
		error: message,
	})
}
