import { Router } from "express";
import pacientRouter from "@modules/pacient/infra/http/routes/pacient.routes";
import sessionRouter from "@modules/auth/infra/http/routes/session.routes";
import psicoRouter from "@modules/psico/infra/http/routes/psico.routes";
import passwordRouter from "@modules/auth/infra/http/routes/password.routes";
import accountRouter from "@modules/auth/infra/http/routes/account.routes";
import reviewRouter from "@modules/review/infra/http/routes/review.routes";

const routes = Router();

routes.use("/pacient", pacientRouter);
routes.use("/session", sessionRouter);
routes.use("/psico", psicoRouter);
routes.use("/password", passwordRouter);
routes.use("/account", accountRouter);
routes.use("/review", reviewRouter);

export default routes;
