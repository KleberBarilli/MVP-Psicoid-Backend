import { Router } from 'express'
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated'
import CreateAdminController from '../controllers/CreateAdminController'
import CreateLogController from '@modules/log/infra/http/controllers/CreateLogController'

const adminRouter = Router()

adminRouter.post('/', new CreateAdminController().handle, CreateLogController.handle())

export default adminRouter
