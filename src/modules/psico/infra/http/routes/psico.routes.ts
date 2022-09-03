import { Router } from "express";
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import CreatePsychologistController from "../controllers/CreatePsychologistController";
import ListPsychologistsController from "../controllers/ListPsychologistsController";
import ShowPsychologistController from "../controllers/ShowPsychologistController";
import UpdatePsychologistController from "../controllers/UpdatePsychologistController";

const psicoRouter = Router();
const createPsicoController = new CreatePsychologistController();
const showPsicoController = new ShowPsychologistController();
const updatePsicoController = new UpdatePsychologistController();
const listPsicoController = new ListPsychologistsController();

psicoRouter.post("/", createPsicoController.create);
psicoRouter.put("/:id", isAuthenticated, updatePsicoController.update);
psicoRouter.get("/:id", isAuthenticated, showPsicoController.show);
psicoRouter.get("/", isAuthenticated, listPsicoController.showAll);
psicoRouter.get("/city/:city", listPsicoController.showByCity);

export default psicoRouter;
