import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import { Router } from "express";
import DeactivateAccountController from "../controllers/DeactivateAccountController";

const deactivateRouter = Router();
const deactivateAccountController = new DeactivateAccountController();

deactivateRouter.post(
	"/deactivate",
	isAuthenticated,
	deactivateAccountController.create,
);

export default deactivateRouter;
