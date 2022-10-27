import { Router } from 'express'
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated'
import CreatePsychologistController from '../controllers/CreatePsychologistController'
import ListPsychologistsController from '../controllers/ListPsychologistsController'
import ShowPsychologistController from '../controllers/ShowPsychologistController'
import UpdatePsychologistController from '../controllers/UpdatePsychologistController'
import { pagination } from '@shared/infra/http/middlewares/pagination'
import CreateLogController from '@modules/log/infra/http/controllers/CreateLogController'

const psicoRouter = Router()

psicoRouter.post('/', new CreatePsychologistController().handle)
psicoRouter.put(
	'/',
	isAuthenticated,
	new UpdatePsychologistController().handle,
	CreateLogController.handle(),
)
psicoRouter.get(
	'/:id',
	isAuthenticated,
	new ShowPsychologistController().handle,
	CreateLogController.handle(),
)
psicoRouter.get(
	'/',
	pagination,
	isAuthenticated,
	new ListPsychologistsController().handle,
	CreateLogController.handle(),
)

export default psicoRouter
