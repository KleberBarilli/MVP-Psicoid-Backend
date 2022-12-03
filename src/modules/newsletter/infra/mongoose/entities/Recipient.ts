import mongoose, { Schema, Model } from "mongoose";

export type RecipientDocument = {
	email: string;
	userId: string;
	sent: boolean;
};

type RecipientModel = Model<RecipientDocument>;
const RecipientSchema = new Schema(
	{
		email: {
			type: String,
			lowercase: true,
			trim: true,
			unique: true,
			required: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Users",
		},
		sent: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model<RecipientDocument, RecipientModel>(
	"Recipients",
	RecipientSchema,
);
