import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import { Router } from "express";

import CreateSessionController from "../controllers/CreateSessionController";
import WhoiamController from "../controllers/WhoiamController";

const sessionRouter = Router();

sessionRouter.post("/", new CreateSessionController().create);
sessionRouter.get("/whoiam", isAuthenticated, new WhoiamController().show);

export default sessionRouter;
