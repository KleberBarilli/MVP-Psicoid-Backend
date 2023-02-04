export interface ITherapeuticApproaches {
	name: string;
	description: string | null;
}
export interface IShowTherapeuticApproaches {
	id: number;
	name: string;
	description: string;
}
export interface IApproaches {
	approaches: ITherapeuticApproaches[];
}
