import CreateLogController from "@modules/log/infra/http/controllers/CreateLogController";
import {
	defaultApiLimiter,
	sendMailLimiter,
} from "@shared/infra/http/middlewares/rateLimiter";
import { Router } from "express";
import { SubscribeContactController } from "../controllers/SubscribeContactController";
import { UnsubscribeContactController } from "../controllers/UnsubscribeContactController";

const newsletterRouter = Router();

newsletterRouter.post(
	"/",
	sendMailLimiter,
	new SubscribeContactController().handle,
	CreateLogController.handle(),
);
newsletterRouter.patch(
	"/unsubscribe",
	defaultApiLimiter,
	new UnsubscribeContactController().handle,
	CreateLogController.handle(),
);

export default newsletterRouter;
