import { IStorageRequest } from "@modules/storage/domain/models/IStorageRequest";
import { IStorageRepository } from "@modules/storage/domain/repositories/IStorageRepository";
import { fileModel, FileDocument } from "../entities/File";

export class StorageRepository implements IStorageRepository {
	public file: typeof fileModel;

	constructor() {
		this.file = fileModel;
	}
	create(data: IStorageRequest): Promise<FileDocument> {
		return this.file.create(data);
	}
}
