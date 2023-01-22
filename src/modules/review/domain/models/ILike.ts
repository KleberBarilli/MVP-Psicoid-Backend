export interface ILike {
	customerId: number;
	reviewId: number;
	likedAt: Date;
}

export interface ICreateLikeResponse {
	review: {
		psychologistId: number;
	};
	customerId: number;
	reviewId: number;
	likedAt: Date;
}

export interface IRemoveLikeResponse {
	review: {
		psychologistId: number;
	};
}
