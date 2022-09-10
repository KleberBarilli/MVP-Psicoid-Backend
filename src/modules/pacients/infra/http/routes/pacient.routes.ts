import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import { Router } from "express";
import CreatePacientController from "../controllers/CreatePacientController";
import ShowPacientController from "../controllers/ShowPacientController";
import UpdatePacientController from "../controllers/UpdatePacientController";

const pacientRouter = Router();

pacientRouter.post("/", new CreatePacientController().create);
pacientRouter.get("/:id", new ShowPacientController().show);
pacientRouter.put("/:id", isAuthenticated, new UpdatePacientController().update);

export default pacientRouter;
