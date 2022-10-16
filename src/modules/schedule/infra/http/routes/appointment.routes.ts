import { Router } from "express";
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import CreateAppointmentController from "../controllers/CreateAppointmentController";
import UpdateAppointmentController from "../controllers/UpdateAppointmentController";
import CreateLogController from "@modules/log/infra/http/controllers/CreateLogController";

const appointmentRouter = Router();

appointmentRouter.post(
	"/",
	isAuthenticated,
	new CreateAppointmentController().handle,
	CreateLogController.handle(),
);
appointmentRouter.put(
	"/:id",
	isAuthenticated,
	new UpdateAppointmentController().handle,
	CreateLogController.handle(),
);

export default appointmentRouter;
