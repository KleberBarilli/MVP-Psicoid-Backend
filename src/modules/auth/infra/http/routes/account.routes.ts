import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import { Router } from "express";
import DeactivateAccountController from "../controllers/DeactivateAccountController";
import UpdateCredentialsController from "../controllers/UpdateCredentials";

const accountRouter = Router();
const deactivateAccountController = new DeactivateAccountController();
const updateCredentials = new UpdateCredentialsController();

accountRouter.post("/deactivate", isAuthenticated, deactivateAccountController.create);
accountRouter.put("/", isAuthenticated, updateCredentials.update);

export default accountRouter;
