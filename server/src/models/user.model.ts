import mongoose, { Model } from 'mongoose';
import validator from 'validator';

export interface UserInterface {
	_id?: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phone: string;
	address: string;
	city: string;
	pin: number;
	active: boolean;
	role: string;
	image: string;
}

const userSchema = new mongoose.Schema<UserInterface>(
	{
		firstName: {
			type: String,
		},
		lastName: {
			type: String,
		},
		email: {
			type: String,
			required: [true, 'User must have an email'],
			unique: true,
			lowercase: true,
			validate: [validator.isEmail, 'please provide a valid email'],
		},
		password: {
			type: String,
			required: [true, 'please provide a password'],
		},
		phone: {
			type: String,
			unique: false,
			validate: [
				{
					validator: (value: string) =>
						validator.isMobilePhone(value, 'any', {
							strictMode: false,
						}),
					message: 'Please provide a valid phone number',
				},
			],
		},
		address: {
			type: String,
		},
		city: {
			type: String,
		},
		pin: {
			type: Number,
		},
		active: {
			type: Boolean,
			default: false,
		},
		image: {
			type: String,
		},
		role: {
			type: String,
			enum: ['admin', 'customer'],
			default: 'customer',
		},
	},
	{
		timestamps: true,
	}
);

export const User: Model<any> = mongoose.model('User', userSchema);
