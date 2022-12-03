import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
	params: {
		type: mongoose.Schema.Types.Mixed,
	},
	query: {
		type: mongoose.Schema.Types.Mixed,
	},
	body: {
		type: mongoose.Schema.Types.Mixed,
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
		customerId: {
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
