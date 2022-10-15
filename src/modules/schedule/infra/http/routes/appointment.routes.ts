import { Router } from "express";
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import CreateAppointmentController from "../controllers/CreateAppointmentController";
import UpdateAppointmentController from "../controllers/UpdateAppointmentController";

const appointmentRouter = Router();

appointmentRouter.post("/", isAuthenticated, new CreateAppointmentController().handle);
appointmentRouter.put("/:id", isAuthenticated, new UpdateAppointmentController().handle);

export default appointmentRouter;
