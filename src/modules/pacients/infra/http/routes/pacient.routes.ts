import { Router } from 'express';

import PacientController from '../controllers/PacientController';

const pacientRouter = Router();
const pacientController = new PacientController();

pacientRouter.post('/', pacientController.create);

export default pacientRouter;
