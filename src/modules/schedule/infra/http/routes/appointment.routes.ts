import { Router } from "express";
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import CreateAppointmentController from "../controllers/CreateAppointmentController";

const appointmentRouter = Router();

appointmentRouter.post("/", isAuthenticated, new CreateAppointmentController().handle);

export default appointmentRouter;
