import { PrismaClient } from "@prisma/client";
import AppError from "@shared/errors/AppError";
import { injectable } from "tsyringe";

@injectable()
export default class SendForgotPasswordEmailService {
	#prisma;
	constructor(
	) {
		this.#prisma = new PrismaClient();
	}

	public async execute(id: string): Promise<void> {
		
}
