import { inject, injectable } from "tsyringe";
import { IStorageRequest } from "../domain/models/IStorageRequest";
import { IStorageRepository } from "../domain/repositories/IStorageRepository";
import S3StorageProvider, { IPutObject } from "../providers/S3StorageProvider";

@injectable()
export default class StorageService {
	#storage;

	constructor(
		@inject("StorageRepository")
		private repo: IStorageRepository,
	) {
		this.#storage = new S3StorageProvider();
	}
	public async execute(filename: string): Promise<IPutObject> {
		return await this.#storage.saveFile(filename);
	}
	public async delete(originalPath: string): Promise<void> {
		await this.#storage.unlinkFile(originalPath);
	}
	public async createDocument(data: IStorageRequest) {
		return this.repo.create(data);
	}
}
