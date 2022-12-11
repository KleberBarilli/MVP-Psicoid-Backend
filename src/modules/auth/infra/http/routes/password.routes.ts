import { sendMailLimiter } from "@shared/infra/http/middlewares/rateLimiter";
import { Router } from "express";
import { ForgotPasswordController } from "../controllers/ForgotPasswordController";
import { ResetPasswordController } from "../controllers/ResetPasswordController";

export const passwordRouter = Router();

passwordRouter.post(
	"/forgot",
	sendMailLimiter,
	new ForgotPasswordController().handle,
);
passwordRouter.post("/reset", new ResetPasswordController().handle);
