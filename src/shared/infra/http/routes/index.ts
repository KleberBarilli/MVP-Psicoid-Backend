import { Router } from 'express';

import pacientRouter from '@modules/pacients/infra/http/routes/pacient.routes';
import sessionRouter from '@modules/session/infra/http/routes/session.routes';
import psicoRouter from '@modules/psico/infra/http/routes/psico.routes';

const routes = Router();

routes.use('/pacient', pacientRouter);
routes.use('/session', sessionRouter);
routes.use('/psico', psicoRouter);

export default routes;
