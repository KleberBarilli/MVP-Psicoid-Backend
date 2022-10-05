declare namespace Express {
	export interface Request {
		user: {
			id: string;
			profile: string;
			profileId: string;
		};
		pagination: {
			skip: number;
			take: number;
			sort: string;
			order: string;
			filter: any;
			search: any;
			location: any;
		};
	}
}
