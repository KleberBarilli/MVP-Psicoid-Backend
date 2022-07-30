import { Router } from 'express';
import userRouter from '../../../../modules/clients/infra/http/routes/users.routes';
import sessionsRouter from '../../../../modules/clients/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
