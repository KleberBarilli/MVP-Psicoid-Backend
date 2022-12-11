import { isAuthenticated } from "@shared/infra/http/middlewares/isAuthenticated";
import { defaultApiLimiter } from "@shared/infra/http/middlewares/rateLimiter";
import { Router } from "express";

import { CreateSessionController } from "../controllers/CreateSessionController";
import { WhoiamController } from "../controllers/WhoiamController";

export const sessionRouter = Router();

sessionRouter.post(
	"/",
	defaultApiLimiter,
	new CreateSessionController().handle,
);
sessionRouter.get("/whoiam", isAuthenticated, new WhoiamController().handle);
