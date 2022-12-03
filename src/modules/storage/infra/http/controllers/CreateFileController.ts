import { Request, Response } from "express";
import CreateFileService from "@modules/storage/services/CreateFileService";
import { container } from "tsyringe";

export default class CreateFileController {
	public async create(req: Request, res: Response): Promise<Response> {
		const { userId, userProfile } = req.body;
		const path = req.file?.path;
		const service = container.resolve(CreateFileService);

		try {
			const image = await service.execute(req.file?.filename as string);
			delete image.Body;
			let url = process.env.AWS_S3_BUCKET_URL + image.Key;
			await service.createDocument({
				userId,
				userProfile,
				key: image.Key,
				url,
				contentType: image.ContentType,
				bucketName: image.Bucket,
			});

			await service.delete(path || "");
			return res.json({ ...image, url });
		} catch (error) {
			return res
				.status(400)
				.json({ error: "Houve um erro ao fazer upload" });
		}
	}
}
