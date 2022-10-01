import { Router } from "express";
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import CreateReviewController from "../controllers/CreateReviewController";
import UpdateReviewController from "../controllers/UpdateReviewController";
import ShowReviewController from "../controllers/ShowReviewController";
import ListReviewByPsicoController from "../controllers/ListReviewsByPsicoController";
import DeleteReviewController from "../controllers/DeleteReviewController";
import { pagination } from "@shared/infra/http/middlewares/pagination";

const reviewRouter = Router();

reviewRouter.post("/", isAuthenticated, new CreateReviewController().handle);
reviewRouter.get("/:id", isAuthenticated, new ShowReviewController().handle);
reviewRouter.get(
	"/psico/:id",
	isAuthenticated,
	pagination,
	new ListReviewByPsicoController().handle,
);
reviewRouter.put("/:id", isAuthenticated, new UpdateReviewController().handle);
reviewRouter.delete("/:id", isAuthenticated, new DeleteReviewController().handle);

export default reviewRouter;
