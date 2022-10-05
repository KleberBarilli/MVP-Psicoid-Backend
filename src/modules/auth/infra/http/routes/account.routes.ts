import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import { Router } from "express";
import DeactivateAccountController from "../controllers/DeactivateAccountController";
import UpdateCredentialsController from "../controllers/UpdateCredentials";

const accountRouter = Router();

accountRouter.post("/deactivate", isAuthenticated, new DeactivateAccountController().handle);
accountRouter.put("/", isAuthenticated, new UpdateCredentialsController().handle);

export default accountRouter;
