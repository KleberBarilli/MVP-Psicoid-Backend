import fs from "fs";
import path from "path";
import { S3 } from "@aws-sdk/client-s3";
import mime from "mime-types";
import uploadConfig from "../config/upload";
export interface IPutObject {
	Bucket: string;
	Key: string;
	ACL: string;
	Body?: Buffer | null;
	ContentType: string;
}
export class S3StorageProvider {
	#client: S3;

	constructor() {
		this.#client = new S3({
			region: process.env.AWS_REGION,
		});
	}
	public async saveFile(file: string): Promise<IPutObject> {
		const originalPath = path.resolve(uploadConfig.tmp, file);

		const ContentType = mime.lookup(originalPath);

		if (!ContentType) {
			throw new Error("File not found");
		}

		const fileContent = await fs.promises.readFile(originalPath);
		const payload = {
			Bucket: uploadConfig.config.aws.bucket,
			Key: file,
			ACL: "public-read",
			Body: fileContent,
			ContentType: ContentType,
		};
		await this.#client
			.putObject({
				...payload,
			})


		return payload;
	}

	public async deleteFile(file: string): Promise<void> {
		await this.#client
			.deleteObject({
				Bucket: uploadConfig.config.aws.bucket,
				Key: file,
			})

	}
	public async unlinkFile(originalPath: string): Promise<void> {
		fs.promises.unlink(originalPath);
	}
}
