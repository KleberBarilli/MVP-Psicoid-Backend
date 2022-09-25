import { Router } from "express";
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import CreatePsychologistController from "../controllers/CreatePsychologistController";
import ListPsychologistsController from "../controllers/ListPsychologistsController";
import ShowPsychologistController from "../controllers/ShowPsychologistController";
import UpdatePsychologistController from "../controllers/UpdatePsychologistController";
import { pagination } from "@shared/infra/http/middlewares/pagination";

const psicoRouter = Router();
const listPsicoController = new ListPsychologistsController();

psicoRouter.post("/", new CreatePsychologistController().handle);
psicoRouter.put("/:id", isAuthenticated, new UpdatePsychologistController().handle);
psicoRouter.get("/:id", isAuthenticated, new ShowPsychologistController().handle);
psicoRouter.get("/", pagination, isAuthenticated, listPsicoController.showAll);
psicoRouter.get("/city/:city", listPsicoController.showByCity);

export default psicoRouter;
