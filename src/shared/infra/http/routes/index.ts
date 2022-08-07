import { Router } from 'express';
import clientRouter from '../../../../modules/clients/infra/http/routes/clients.routes';
import sessionsRouter from '../../../../modules/auth/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/client', clientRouter);
routes.use('/session', sessionsRouter);

export default routes;
