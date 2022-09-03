import { Router } from "express";
import CreatePacientController from "../controllers/CreatePacientController";
import ShowPacientController from "../controllers/ShowPacientController";

const pacientRouter = Router();
const createPacientController = new CreatePacientController();
const showPacient = new ShowPacientController();

pacientRouter.post("/", createPacientController.create);
pacientRouter.get("/:id", showPacient.show);

export default pacientRouter;
