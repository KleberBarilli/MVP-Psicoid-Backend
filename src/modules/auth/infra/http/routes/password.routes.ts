import { Router } from "express";
import ForgotPasswordController from "../controllers/ForgotPasswordController";
import ResetPasswordController from "../controllers/ResetPasswordController";

const passwordRouter = Router();

passwordRouter.post("/forgot", new ForgotPasswordController().handle);
passwordRouter.post("/reset", new ResetPasswordController().handle);

export default passwordRouter;
