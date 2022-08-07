import { Router } from 'express';
import PsychologistsController from '../controllers/PsychologistsController';

const psicoRouter = Router();
const psicoController = new PsychologistsController();

psicoRouter.post('/', psicoController.create);

export default psicoRouter;
