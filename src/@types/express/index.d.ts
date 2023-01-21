declare namespace Express {
	export interface Request {
		user: {
			id: bigint;
			profile: string;
			profileId: bigint;
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
