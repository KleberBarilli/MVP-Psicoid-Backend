import { Request, Response } from "express";
import Queue from "@shared/lib/bull/Queue";

export class CreateLogController {
	public static handle() {
		return (req: Request, res: Response) => {
			try {
				if (process.env.LOGS !== "1") {
					return;
				}
				const { profile, profileId } = req.user;
				const {
					method,
					route: { path },
					params = null,
					query = null,
					body = null,
				} = req;

				const data = Object.entries({ params, query, body }).reduce(
					(acm, [key, value]) =>
						typeof value === "object" &&
						Object.keys(value).length > 0
							? { ...acm, [key]: value }
							: acm,
					{},
				);
				Queue.add("SaveLogsOnMongo", {
					profile,
					profileId,
					method,
					path,
					data,
				});
			} catch (error) {
				//	console.log(error);
			} finally {
				res.send();
			}
		};
	}
}
