import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import { Router } from "express";
import CreatePacientController from "../controllers/CreatePacientController";
import ShowPacientController from "../controllers/ShowPacientController";
import UpdatePacientController from "../controllers/UpdatePacientController";

const pacientRouter = Router();
const createPacientController = new CreatePacientController();
const showPacient = new ShowPacientController();
const updatePacient = new UpdatePacientController();

pacientRouter.post("/", createPacientController.create);
pacientRouter.get("/:id", showPacient.show);
pacientRouter.put("/:id", isAuthenticated, updatePacient.update);

export default pacientRouter;
