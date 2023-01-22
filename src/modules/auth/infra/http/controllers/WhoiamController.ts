import { HTTP_STATUS_CODE } from "@shared/utils/enums";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { WhoiamService } from "../../../services/WhoiamService";

export class WhoiamController {
	public async handle(req: Request, res: Response): Promise<Response> {
		try {
			const { id, profile, profileId } = req.user;
			console.log("AAAAAAAAAAAAA", id, profile, profileId);
			const whoiam = container.resolve(WhoiamService);
			const user = await whoiam.execute({
				credentialId: id,
				profile,
				profileId,
			});

			return res.status(HTTP_STATUS_CODE.OK).json({
				message: "User Found",
				data: { ...user, password: null },
			});
		} catch (err) {
			return res
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
				.json({ message: "Erro interno do servidor" });
		}
	}
}
