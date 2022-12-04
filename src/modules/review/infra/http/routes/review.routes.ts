import { Router } from "express";
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import CreateReviewController from "../controllers/CreateReviewController";
import UpdateReviewController from "../controllers/UpdateReviewController";
import ShowReviewController from "../controllers/ShowReviewController";
import ListReviewByPsicoController from "../controllers/ListReviewsByPsicoController";
import DeleteReviewController from "../controllers/DeleteReviewController";
import { pagination } from "@shared/infra/http/middlewares/pagination";
import { handleRole } from "@shared/infra/http/middlewares/handleRole";
import AddLikeController from "../controllers/AddLikeController";
import RemoveLikeController from "../controllers/RemoveLikeController";
import CreateLogController from "@modules/log/infra/http/controllers/CreateLogController";
import { defaultApiLimiter } from "@shared/infra/http/middlewares/rateLimiter";

const reviewRouter = Router();

reviewRouter.post(
	"/",
	isAuthenticated,
	new CreateReviewController().handle,
	CreateLogController.handle(),
);
reviewRouter.get("/:id", isAuthenticated, new ShowReviewController().handle);
reviewRouter.get(
	"/psico/:id",
	isAuthenticated,
	pagination,
	new ListReviewByPsicoController().handle,
	CreateLogController.handle(),
);
reviewRouter.put(
	"/:id",
	isAuthenticated,
	new UpdateReviewController().handle,
	CreateLogController.handle(),
);
reviewRouter.delete(
	"/:id",
	isAuthenticated,
	handleRole("CUSTOMER"),
	new DeleteReviewController().handle,
	CreateLogController.handle(),
);
reviewRouter.patch(
	"/:reviewId/like",
	isAuthenticated,
	defaultApiLimiter,
	handleRole("CUSTOMER"),
	new AddLikeController().handle,
	CreateLogController.handle(),
);
reviewRouter.delete(
	"/:reviewId/like",
	isAuthenticated,
	defaultApiLimiter,
	handleRole("CUSTOMER"),
	new RemoveLikeController().handle,
	CreateLogController.handle(),
);

export default reviewRouter;
