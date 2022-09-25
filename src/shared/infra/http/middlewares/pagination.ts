import { NextFunction, Request, Response } from "express";

export const pagination = (req: any, res: Response, next: NextFunction) => {
	const {
		page = 1,
		limit: take = 2,
		sort = "createdAt",
		order = "desc",
		filter = "null",
		search = {},
	} = req.query;
	req.pagination = {
		skip: (page - 1) * take,
		take: parseInt(take),
		sort,
		order: order.toLowerCase(),
		filter: JSON.parse(filter),
		search,
	};
	return next();
};
