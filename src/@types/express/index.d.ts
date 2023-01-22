declare namespace Express {
	export interface Request {
		user: {
			id: number;
			profile: string;
			profileId: number;
		};
		pagination: {
			skip: number;
			take: number;
			sort: string;
			order: string;
			filter: any;
			search: any;
			latitude: number;
			longitude: number;
		};
	}
}
