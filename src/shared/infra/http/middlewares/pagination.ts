import { NextFunction, Response } from "express";

export interface IPagination {
	skip: number;
	take: number;
	sort: string;
	order: string;
	filter: any;
	search: any;
	location: any;
}

export const pagination = (req: any, res: Response, next: NextFunction) => {
	const {
		page = 1,
		limit: take = 5,
		sort = "createdAt",
		order = "desc",
		filter = "null",
		search = {},
		location = {},
	} = req.query;
	req.pagination = {
		skip: (page - 1) * take,
		take: parseInt(take),
		sort,
		order: order.toLowerCase(),
		filter: JSON.parse(filter),
		search,
		location: { lat: -23.55052, long: -46.633308 },
	};
	return next();
};
