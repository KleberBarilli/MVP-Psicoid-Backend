import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
	params: {
		type: String,
	},
	query: {
		type: String,
	},
	body: {
		type: Object,
	},
});

const LogSchema = new mongoose.Schema(
	{
		method: {
			type: String,
			required: true,
		},
		route: {
			type: String,
			required: true,
		},
		psychologistId: {
			type: String,
		},
		pacientId: {
			type: String,
		},
		data: {
			type: DataSchema,
		},
	},
	{ timestamps: true },
);

const LogModel = mongoose.model("Logs", LogSchema);

export default LogModel;
