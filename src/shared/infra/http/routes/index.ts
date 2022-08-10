import { Router } from 'express';
import clientRouter from '@modules/clients/infra/http/routes/clients.routes';
import sessionsRouter from '@modules/auth/infra/http/routes/sessions.routes';
import psicoRouter from '@modules/psico/infra/http/routes/psico.routes';

const routes = Router();

routes.use('/client', clientRouter);
routes.use('/session', sessionsRouter);
routes.use('/psico', psicoRouter);

export default routes;
