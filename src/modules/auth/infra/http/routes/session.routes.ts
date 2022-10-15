import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import { Router } from "express";
import CreateLogController from "@modules/log/infra/http/controllers/CreateLogController";

import CreateSessionController from "../controllers/CreateSessionController";
import WhoiamController from "../controllers/WhoiamController";

const sessionRouter = Router();

sessionRouter.post("/", new CreateSessionController().handle);
sessionRouter.get(
	"/whoiam",
	isAuthenticated,
	new WhoiamController().handle,
	CreateLogController.handle(),
);

export default sessionRouter;
