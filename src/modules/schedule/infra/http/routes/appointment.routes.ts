import { Router } from "express";
import { isAuthenticated } from "@shared/infra/http/middlewares/isAuthenticated";
import { CreateAppointmentController } from "../controllers/CreateAppointmentController";
import { UpdateAppointmentController } from "../controllers/UpdateAppointmentController";
import { CreateLogController } from "@modules/log/infra/http/controllers/CreateLogController";
import { CancelAppointmentController } from "../controllers/CancelAppointmentController";
import { ShowAppointmentController } from "../controllers/ShowAppointmentController";
import { ListAppointmentsByPsicoController } from "../controllers/ListAppointmentByPsicoController";
import { ListAppointmentsByCustomerController } from "../controllers/ListAppointmentByCustomerController";
import { pagination } from "@shared/infra/http/middlewares/pagination";
import { handleRole } from "@shared/infra/http/middlewares/handleRole";

export const appointmentRouter = Router();

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
appointmentRouter.patch(
	"/:id/cancel",
	isAuthenticated,
	new CancelAppointmentController().handle,
	CreateLogController.handle(),
);
appointmentRouter.get(
	"/:id",
	isAuthenticated,
	new ShowAppointmentController().handle,
	CreateLogController.handle(),
);
appointmentRouter.get(
	"/find-by/psico",
	isAuthenticated,
	handleRole("ADMIN", "PSYCHOLOGIST"),
	pagination,
	new ListAppointmentsByPsicoController().handle,
	CreateLogController.handle(),
);
appointmentRouter.get(
	"/find-by/customer",
	pagination,
	isAuthenticated,
	handleRole("ADMIN", "CUSTOMER"),
	new ListAppointmentsByCustomerController().handle,
	CreateLogController.handle(),
);
