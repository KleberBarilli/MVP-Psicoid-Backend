import { Router } from 'express';

import SessionController from '../controllers/SessionController';
import WhoiamController from '../controllers/WhoiamController';

const sessionRouter = Router();
const createSessionController = new SessionController();
const whoiamController = new WhoiamController();

sessionRouter.post('/', createSessionController.create);
sessionRouter.get('/whoiam', whoiamController.show);

export default sessionRouter;
