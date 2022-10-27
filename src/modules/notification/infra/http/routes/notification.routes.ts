import { Router } from 'express'
import { pagination } from '@shared/infra/http/middlewares/pagination'
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated'
import ListNotificationsController from '../controllers/ListNotificationsController'
import ShowNotificationController from '../controllers/ShowNotificationController'
import DeleteNotificationController from '../controllers/DeleteViewNotificationController'
import UpdateViewNotificationController from '../controllers/UpdateViewNotificationController'

import CreateLogController from '@modules/log/infra/http/controllers/CreateLogController'
import HandleAllNotificationController from '../controllers/HandleAllViewsNotificationController'

const notificationRouter = Router()

notificationRouter.get(
	'/',
	isAuthenticated,
	pagination,
	new ListNotificationsController().handle,
	CreateLogController.handle(),
)
notificationRouter.get(
	'/:id',
	isAuthenticated,
	new ShowNotificationController().handle,
	CreateLogController.handle(),
)
notificationRouter.patch(
	'/:id/read/:read',
	isAuthenticated,
	new UpdateViewNotificationController().handle,
	CreateLogController.handle(),
)
notificationRouter.patch(
	'/action/:action',
	isAuthenticated,
	new HandleAllNotificationController().handle,
	CreateLogController.handle(),
)

notificationRouter.delete(
	'/:id',
	isAuthenticated,
	new DeleteNotificationController().handle,
	CreateLogController.handle(),
)

export default notificationRouter
