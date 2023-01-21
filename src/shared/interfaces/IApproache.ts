export interface ITherapeuticApproache {
	name: string;
	description: string | null;
}
export interface IShowTherapeuticApproache {
	id: bigint;
	name: string;
	description: string;
}
export interface IApproache {
	approaches: ITherapeuticApproache[];
}
