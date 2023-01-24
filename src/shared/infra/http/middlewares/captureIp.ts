import { Request, Response, NextFunction } from "express";

export const captureIp = (req: Request, res: Response, next: NextFunction) => {
	const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
	req.user.ip = ip;
	next();
};
