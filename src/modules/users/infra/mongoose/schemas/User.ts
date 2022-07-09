import { Schema, model } from 'mongoose';
import { IUser } from '../../../domain/models/IUser';

const userSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

export const User = model<IUser>('User', userSchema);
