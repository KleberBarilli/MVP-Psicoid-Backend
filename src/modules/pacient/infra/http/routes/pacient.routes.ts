import { handleRole } from "@shared/infra/http/middlewares/handleRole";
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import { pagination } from "@shared/infra/http/middlewares/pagination";
import { Router } from "express";
import AddPsychologistController from "../controllers/AddPsychologistController";
import CreateGuestPacientController from "../controllers/CreateGuestPacientController";
import CreatePacientController from "../controllers/CreatePacientController";
import ListPacientsByPsicoController from "../controllers/ListPacientsByPsicoController";
import ShowPacientController from "../controllers/ShowPacientController";
import UpdatePacientController from "../controllers/UpdatePacientController";

const pacientRouter = Router();

pacientRouter.post("/", new CreatePacientController().handle);
pacientRouter.post(
	"/guest",
	isAuthenticated,
	handleRole("PSYCHOLOGIST"),
	new CreateGuestPacientController().handle,
),
	pacientRouter.post(
		"/add-psychologist",
		isAuthenticated,
		handleRole("PACIENT"),
		new AddPsychologistController().handle,
	);
pacientRouter.put("/", isAuthenticated, new UpdatePacientController().handle);
pacientRouter.get(
	"/:id",
	isAuthenticated,
	handleRole("PSYCHOLOGIST"),
	new ShowPacientController().handle,
);
pacientRouter.get(
	"/",
	isAuthenticated,
	handleRole("PSYCHOLOGIST"),
	pagination,
	new ListPacientsByPsicoController().handle,
);

export default pacientRouter;
