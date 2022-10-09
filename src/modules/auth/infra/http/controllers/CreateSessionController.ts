import { Request, Response } from "express";
import { container } from "tsyringe";
import { validateLogin } from "@validators/Credentials";
import CreateSessionService from "../../../services/CreateSessionService";
import AppError from "@shared/errors/AppError";
export default class CreateSessionController {
	public async handle(req: Request, res: Response): Promise<Response> {
		const { email, password } = req.body;

		try {
			await validateLogin({ email, password });

			const createSession = container.resolve(CreateSessionService);

			const user = await createSession.execute({
				email,
				password,
			});
			return res.json({ data: user });
		} catch (err) {
			console.log(err);
			if (err instanceof AppError) {
				return res.status(err.statusCode).json({ message: err.message });
			}
			return res.status(500).json({ error: "Erro ao logar" });
		}
	}
}
