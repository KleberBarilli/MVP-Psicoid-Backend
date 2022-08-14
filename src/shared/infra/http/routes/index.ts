import { Router } from 'express';

import pacientRouter from '@modules/pacients/infra/http/routes/pacient.routes';
import sessionRouter from '@modules/auth/infra/http/routes/session.routes';
import psicoRouter from '@modules/psico/infra/http/routes/psico.routes';
import passwordRouter from '@modules/auth/infra/http/routes/password.routes';

const routes = Router();

routes.use('/pacient', pacientRouter);
routes.use('/session', sessionRouter);
routes.use('/psico', psicoRouter);
routes.use('/password', passwordRouter);

export default routes;
