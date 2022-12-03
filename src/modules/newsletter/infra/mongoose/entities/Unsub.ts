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
			ref: "Users",
		},
		reason: String,
	},
	{
		timestamps: true,
	},
);

export default mongoose.model<UnsubDocument, UnsubModel>("Unsubs", UnsubSchema);
