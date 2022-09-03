import { Router } from "express";
import CreatePsychologistController from "../controllers/CreatePsychologistController";
import ShowPsychologistController from "../controllers/ShowPsychologistController";
import UpdatePsychologistController from "../controllers/UpdatePsychologistController";

const psicoRouter = Router();
const createPsicoController = new CreatePsychologistController();
const showPsicoController = new ShowPsychologistController();
const updatePsicoController = new UpdatePsychologistController();

psicoRouter.post("/", createPsicoController.create);
psicoRouter.get("/:id", showPsicoController.show);
psicoRouter.put("/:id", updatePsicoController.update);

export default psicoRouter;
