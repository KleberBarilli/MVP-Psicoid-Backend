import path from "path";
import multer, { StorageEngine } from "multer";
import crypto from "crypto";

interface IUploadConfig {
	driver: "S3" | "DISK";
	tmp: string;
	directory: string;
	multer: {
		storage: StorageEngine;
		limits: {
			fileSize: number;
		};
	};
	config: {
		aws: {
			bucket: string;
		};
	};
}

const uploadFolder = path.resolve(__dirname, "..", "..", "tmp", "uploads");
const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

export default {
	driver: process.env.STORAGE_DRIVER,
	directory: uploadFolder,
	tmp: tmpFolder,
	multer: {
		storage: multer.diskStorage({
			destination: tmpFolder,
			filename: (req, file, cb) => {
				const fileHash = crypto.randomBytes(16).toString("hex");

				const filename = `${fileHash}-${file.originalname}`;

				cb(null, filename);
			},
		}),
		limits: {
			fileSize: 2 * 1024 * 1024,
		},
		fileFilter: (
			req: any,
			file: { mimetype: string },
			cb: (arg0: Error | null, arg1: boolean | undefined) => void,
		) => {
			const allowedMimes = ["image/png", "image/jpeg", "image/pjpeg"];
			if (allowedMimes.includes(file.mimetype)) {
				cb(null, true);
			} else {
				cb(new Error("Invalid file type"), false);
			}
		},
	},
	config: {
		aws: {
			bucket: process.env.AWS_S3_STORAGE_BUCKET_NAME,
		},
	},
} as IUploadConfig;
