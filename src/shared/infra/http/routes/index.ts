import { Router } from 'express';
import clientRouter from '../../../../modules/clients/infra/http/routes/clients.routes';
import sessionsRouter from '../../../../modules/auth/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/clients', clientRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
