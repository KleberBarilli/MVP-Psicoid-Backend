declare namespace Express {
	export interface Request {
		user: {
			id: number;
			profile: string;
			profileId: number;
			ip: string | string[] | undefined;
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
