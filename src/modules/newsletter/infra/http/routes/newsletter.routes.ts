import CreateLogController from "@modules/log/infra/http/controllers/CreateLogController";
import { Router } from "express";
import { SubscribeContactController } from "../controllers/SubscribeContactController";
import { UnsubscribeContactController } from "../controllers/UnsubscribeContactController";

const newsletterRouter = Router();

newsletterRouter.post(
	"/",
	new SubscribeContactController().handle,
	CreateLogController.handle(),
);
newsletterRouter.patch(
	"/unsubscribe",
	new UnsubscribeContactController().handle,
	CreateLogController.handle(),
);

export default newsletterRouter;
