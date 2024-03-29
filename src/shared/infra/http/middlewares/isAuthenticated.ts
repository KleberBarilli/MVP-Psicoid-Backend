import { NextFunction, Request, Response } from "express";
import { verify, Secret } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";
import authConfig from "@config/auth";

interface ITokenPayload {
	iat: number;
	exp: number;
	id: number;
	profile: string;
	profileId: number;
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

		const { id, profile, profileId } =
			decodedToken as unknown as ITokenPayload;

		req.user = {
			id,
			profile,
			profileId,
		};
		return next();
	} catch {
		throw new AppError({ message: "Invalid JWT Token.", statusCode: 401 });
	}
}
