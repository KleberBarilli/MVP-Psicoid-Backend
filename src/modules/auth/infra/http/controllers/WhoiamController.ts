import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import WhoiamService from "../../../services/WhoiamService";

export default class WhoiamController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { id, profile, profileId } = req.user;
			const whoiam = container.resolve(WhoiamService);
			const user = await whoiam.execute({
				credentialId: id,
				profile,
				profileId,
			});
			res.status(200).json({
				message: "User Found",
				data: { ...user, password: null },
			});

			next();
		} catch (err) {
			return res
				.status(500)
				.json({ message: "Erro interno do servidor" });
		}
	}
}
