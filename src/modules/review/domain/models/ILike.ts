export interface ILike {
	customerId: string;
	reviewId: string;
	likedAt: Date;
}

export interface ICreateLikeResponse {
	review: {
		psychologistId: string;
	};
	customerId: string;
	reviewId: string;
	likedAt: Date;
}

export interface IRemoveLikeResponse {
	review: {
		psychologistId: string;
	};
}
