import { Schema, model } from 'mongoose';
import { IUser } from '../../../domain/models/IUser';

export const UserSchema = new Schema<IUser>(
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
			select: false,
		},
		avatar: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);
UserSchema.methods.toJSON = function () {
	const obj = this.toObject();
	delete obj.password;
	return obj;
};

export const UsersModel = model('User', UserSchema);
