import CreateLogController from '@modules/log/infra/http/controllers/CreateLogController'
import { handleRole } from '@shared/infra/http/middlewares/handleRole'
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated'
import { pagination } from '@shared/infra/http/middlewares/pagination'
import { Router } from 'express'
import AddPsychologistController from '../controllers/AddPsychologistController'
import CreateGuestCustomerController from '../controllers/CreateGuestController'
import CreateCustomerController from '../controllers/CreateCustomerController'
import ListCustomersByPsicoController from '../controllers/ListCustomersByPsicoController'
import ShowCustomerController from '../controllers/ShowCustomerController'
import UpdateCustomerController from '../controllers/UpdateCustomerController'

const customerRouter = Router()

customerRouter.post('/', new CreateCustomerController().handle)
customerRouter.post(
	'/guest',
	isAuthenticated,
	handleRole('PSYCHOLOGIST'),
	new CreateGuestCustomerController().handle,
	CreateLogController.handle(),
),
	customerRouter.post(
		'/add-psychologist',
		isAuthenticated,
		handleRole('CUSTOMER'),
		new AddPsychologistController().handle,
		CreateLogController.handle(),
	)
customerRouter.put('/', isAuthenticated, new UpdateCustomerController().handle)
customerRouter.get(
	'/:id',
	isAuthenticated,
	handleRole('PSYCHOLOGIST'),
	new ShowCustomerController().handle,
)
customerRouter.get(
	'/',
	isAuthenticated,
	handleRole('PSYCHOLOGIST'),
	pagination,
	new ListCustomersByPsicoController().handle,
)

export default customerRouter
