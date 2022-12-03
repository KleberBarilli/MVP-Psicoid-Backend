import { Profile } from "@modules/storage/infra/mongoose/entities/File";

export interface IStorageRequest {
	userId: string;
	userProfile: Profile;
	key: string;
	url?: string | null;
	contentType: string;
	bucketName: string;
}
