import { Router } from 'express';

import PsychologistController from '../controllers/PsychologistController';

const psicoRouter = Router();
const psicoController = new PsychologistController();

psicoRouter.post('/', psicoController.create);

export default psicoRouter;
