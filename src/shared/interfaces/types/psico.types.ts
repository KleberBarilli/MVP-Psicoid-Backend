export type CreateInviteResponse = {
	token: string | null;
	name: string;
	email: string;
	psychologist: {
		profile: {
			firstName: string;
			lastName: string;
		};
	};
};
