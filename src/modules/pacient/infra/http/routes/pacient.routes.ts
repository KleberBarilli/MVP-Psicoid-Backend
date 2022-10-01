import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import { Router } from "express";
import AddPsychologistController from "../controllers/AddPsychologistController";
import CreatePacientController from "../controllers/CreatePacientController";
import ShowPacientController from "../controllers/ShowPacientController";
import UpdatePacientController from "../controllers/UpdatePacientController";

const pacientRouter = Router();

pacientRouter.post("/", new CreatePacientController().handle);
pacientRouter.get("/:id", new ShowPacientController().handle);
pacientRouter.put("/", isAuthenticated, new UpdatePacientController().handle);
pacientRouter.post("/add-psychologist", isAuthenticated, new AddPsychologistController().handle);

export default pacientRouter;
