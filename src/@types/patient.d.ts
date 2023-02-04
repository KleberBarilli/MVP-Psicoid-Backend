interface Patient {
	table: string;
	data: [
		{
			credential: {
				email: string;
				password: string;
			};
			profile: {
				firstName: string;
				lastName: string;
				cpf: string;
				contact: {
					telephone: string;
					email: string;
				};
			};
		},
	];
}

declare const rawPatients: Patient[];

export default rawPatients;
