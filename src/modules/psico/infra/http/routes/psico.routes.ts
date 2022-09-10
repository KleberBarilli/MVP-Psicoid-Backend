import { Router } from "express";
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import CreatePsychologistController from "../controllers/CreatePsychologistController";
import ListPsychologistsController from "../controllers/ListPsychologistsController";
import ShowPsychologistController from "../controllers/ShowPsychologistController";
import UpdatePsychologistController from "../controllers/UpdatePsychologistController";

const psicoRouter = Router();
const listPsicoController = new ListPsychologistsController();

psicoRouter.post("/", new CreatePsychologistController().create);
psicoRouter.put("/:id", isAuthenticated, new UpdatePsychologistController().update);
psicoRouter.get("/:id", isAuthenticated, new ShowPsychologistController().show);
psicoRouter.get("/", isAuthenticated, listPsicoController.showAll);
psicoRouter.get("/city/:city", listPsicoController.showByCity);

export default psicoRouter;
