import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import { Router } from "express";
import { handleRole } from "@shared/infra/http/middlewares/handleRole";

import SessionController from "../controllers/SessionController";
import WhoiamController from "../controllers/WhoiamController";

const sessionRouter = Router();

const createSessionController = new SessionController();
const whoiamController = new WhoiamController();

sessionRouter.post("/", createSessionController.create);
sessionRouter.get("/whoiam", isAuthenticated, whoiamController.show);

export default sessionRouter;
