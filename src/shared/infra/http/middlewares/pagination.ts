import { ISearch } from '@shared/interfaces/IPagination'
import { NextFunction, Response } from 'express'

export interface IPagination {
	skip: number
	take: number
	sort: string
	order: string
	filter: any
	search: ISearch
	latitude: number
	longitude: number
}

export const pagination = (req: any, res: Response, next: NextFunction) => {
	const {
		page = 1,
		limit: take = 5,
		sort = 'createdAt',
		order = 'desc',
		filter = 'null',
		search = {},
		latitude = 0,
		longitude = 0,
	} = req.query
	req.pagination = {
		skip: (page - 1) * take,
		take: parseInt(take),
		sort,
		order: order.toLowerCase(),
		filter: JSON.parse(filter),
		search,
		latitude,
		longitude,
	}
	return next()
}
