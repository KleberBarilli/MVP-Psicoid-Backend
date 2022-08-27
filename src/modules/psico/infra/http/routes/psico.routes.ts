import { Router } from "express";

import PsychologistController from "../controllers/PsychologistController";
import ShowPsychologistController from "../controllers/ShowPsychologistController";

const psicoRouter = Router();
const psicoController = new PsychologistController();
const showPsicoController = new ShowPsychologistController();

psicoRouter.post("/", psicoController.create);
psicoRouter.get("/:id", showPsicoController.show);

export default psicoRouter;
