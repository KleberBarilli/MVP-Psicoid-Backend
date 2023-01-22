export interface ILike {
	customerId: bigint;
	reviewId: bigint;
	likedAt: Date;
}

export interface ICreateLikeResponse {
	review: {
		psychologistId: bigint;
	};
	customerId: bigint;
	reviewId: bigint;
	likedAt: Date;
}

export interface IRemoveLikeResponse {
	review: {
		psychologistId: bigint;
	};
}
