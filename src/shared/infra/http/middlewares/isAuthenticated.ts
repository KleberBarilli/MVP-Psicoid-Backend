import { NextFunction, Request, Response } from "express";
import { verify, Secret } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";
import authConfig from "@config/auth";

interface ITokenPayload {
	iat: number;
	exp: number;
	sub: string;
	profile: string;
	profileId: bigint;
}

export function isAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction,
): void {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		throw new AppError({ message: "JWT Token is missing." });
	}
	const [, token] = authHeader.split(" ");

	try {
		const decodedToken = verify(token, authConfig.jwt.secret as Secret);

		const { sub, profile, profileId } = decodedToken as ITokenPayload;

		req.user = {
			id: sub,
			profile,
			profileId,
		};
		return next();
	} catch {
		throw new AppError({ message: "Invalid JWT Token.", statusCode: 401 });
	}
}
