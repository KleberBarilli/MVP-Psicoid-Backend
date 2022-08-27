import { Router } from 'express';

import PacientController from '../controllers/PacientController';
import ShowPacientController from '../controllers/ShowPacientController';

const pacientRouter = Router();
const pacientController = new PacientController();
const showPacient = new ShowPacientController();

pacientRouter.post('/', pacientController.create);
pacientRouter.get('/:id', showPacient.show);

export default pacientRouter;
