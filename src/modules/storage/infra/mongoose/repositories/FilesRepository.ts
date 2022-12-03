import { IStorageRequest } from "@modules/storage/domain/models/IStorageRequest";
import { IStorageRepository } from "@modules/storage/domain/repositories/IStorageRepository";
import FileModel, { FileDocument } from "../entities/File";

export default class StorageRepository implements IStorageRepository {
	public file: typeof FileModel;

	constructor() {
		this.file = FileModel;
	}
	create(data: IStorageRequest): Promise<FileDocument> {
		return this.file.create(data);
	}
}
