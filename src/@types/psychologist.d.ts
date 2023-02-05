import { BrazilState } from "@prisma/client";

interface Psychologist {
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
			office: {
				contact: {
					telephone: string;
					cellPhone: string;
				};
				address: {
					street: string;
					number: string;
					neighborhood: string;
					city: string;
					state: BrazilState;
					zipCode: string;
				};
			};
			resume: string;
			approaches: [
				{
					name: string;
					description: string;
				},
			];
		},
	];
}

declare const rawPsychologists: Psychologist[];

export default rawPatients;
