import { Router } from "express";
import customerRouter from "@modules/customer/infra/http/routes/customer.routes";
import sessionRouter from "@modules/auth/infra/http/routes/session.routes";
import psicoRouter from "@modules/psico/infra/http/routes/psico.routes";
import passwordRouter from "@modules/auth/infra/http/routes/password.routes";
import accountRouter from "@modules/auth/infra/http/routes/account.routes";
import reviewRouter from "@modules/review/infra/http/routes/review.routes";
import approachRouter from "@modules/psico/infra/http/routes/approach.routes";
import appointmentRouter from "@modules/schedule/infra/http/routes/appointment.routes";
import notificationRouter from "@modules/notification/infra/http/routes/notification.routes";

const routes = Router();

routes.use("/customer", customerRouter);
routes.use("/session", sessionRouter);
routes.use("/psico", psicoRouter);
routes.use("/approach", approachRouter);
routes.use("/password", passwordRouter);
routes.use("/account", accountRouter);
routes.use("/review", reviewRouter);
routes.use("/appointment", appointmentRouter);
routes.use("/notification", notificationRouter);

export default routes;
