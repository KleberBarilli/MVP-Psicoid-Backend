import { Router } from "express";
import { isAuthenticated } from "@shared/infra/http/middlewares/isAuthenticated";
import { ListTherapeuticApproachesController } from "../controllers/ListTherapeuticApproachesController";
import { pagination } from "@shared/infra/http/middlewares/pagination";
import { handleRole } from "@shared/infra/http/middlewares/handleRole";
import { AddApproachController } from "../controllers/AddAproachController";
import { RemoveApproachController } from "../controllers/RemoveApproachController";
import { ShowApproachController } from "../controllers/ShowApproachController";
import { CreateLogController } from "@modules/log/infra/http/controllers/CreateLogController";

export const approachRouter = Router();

approachRouter.get(
	"/",
	pagination,
	isAuthenticated,
	new ListTherapeuticApproachesController().handle,
);
approachRouter.get(
	"/:id",
	pagination,
	isAuthenticated,
	new ShowApproachController().handle,
);

approachRouter.patch(
	"/add",
	isAuthenticated,
	handleRole("PSYCHOLOGIST"),
	new AddApproachController().handle,
	CreateLogController.handle(),
);
approachRouter.patch(
	"/remove",
	isAuthenticated,
	handleRole("PSYCHOLOGIST"),
	new RemoveApproachController().handle,
	CreateLogController.handle(),
);
