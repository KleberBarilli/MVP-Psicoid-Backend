import mongoose, { Schema, Model } from "mongoose";

export type UnsubDocument = {
	userId: string;
	reason: string;
};
type UnsubModel = Model<UnsubDocument>;

const UnsubSchema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Contacts",
		},
		reason: String,
	},
	{
		timestamps: true,
	},
);

export const modelUnsub = mongoose.model<UnsubDocument, UnsubModel>(
	"Unsubs",
	UnsubSchema,
);
