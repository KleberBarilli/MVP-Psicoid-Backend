import { NextFunction, Request, Response } from 'express';
import { verify, Secret } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

interface ITokenPayload {
	iat: number;
	exp: number;
	sub: string;
	profile: string;
}

export default function isAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction,
): void {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		throw new AppError('JWT Token is missing.');
	}
	const [, token] = authHeader.split(' ');

	try {
		const decodedToken = verify(token, authConfig.jwt.secret as Secret);

		const { sub, profile } = decodedToken as ITokenPayload;

		req.user = {
			id: sub,
			profile,
		};
		return next();
	} catch {
		throw new AppError('Invalid JWT Token.', 401);
	}
}
