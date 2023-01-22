export interface ITherapeuticApproache {
	name: string;
	description: string | null;
}
export interface IShowTherapeuticApproache {
	id: number;
	name: string;
	description: string;
}
export interface IApproache {
	approaches: ITherapeuticApproache[];
}
