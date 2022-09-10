import { Router } from "express";
import ForgotPasswordController from "../controllers/ForgotPasswordController";
import ResetPasswordController from "../controllers/ResetPasswordController";

const passwordRouter = Router();

passwordRouter.post("/forgot", new ForgotPasswordController().create);
passwordRouter.post("/reset", new ResetPasswordController().create);

export default passwordRouter;
