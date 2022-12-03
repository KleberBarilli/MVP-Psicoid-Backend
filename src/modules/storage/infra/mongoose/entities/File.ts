import mongoose, { Schema, Model } from "mongoose";

export enum Profile {
	"CUSTOMER",
	"PSYCHOLOGIST",
}
export type FileDocument = {
	userId: string;
	userProfile: Profile;
	key: string;
	url: string;
	contentType: string;
	bucketName: string;
};

type FileModel = Model<FileDocument>;

const FileSchema = new Schema(
	{
		userId: {
			type: String,
		},
		userProfile: { type: String, enum: Profile },
		key: {
			type: String,
			required: true,
			unique: true,
		},
		url: {
			type: String,
			unique: true,
			required: true,
		},
		contentType: {
			type: String,
		},
		bucketName: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model<FileDocument, FileModel>("Files", FileSchema);
