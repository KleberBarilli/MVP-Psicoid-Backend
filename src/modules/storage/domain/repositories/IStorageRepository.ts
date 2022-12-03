import { FileDocument } from "@modules/storage/infra/mongoose/entities/File";
import { IStorageRequest } from "../models/IStorageRequest";

export interface IStorageRepository {
	create(data: IStorageRequest): Promise<FileDocument>;
}
