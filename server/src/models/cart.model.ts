import mongoose, { Model, ObjectId } from 'mongoose';

export interface CartInterface {
	_id?: string;
	productId: ObjectId;
	userId: ObjectId;
	quantity: number;
	subTotal: number;
}

const cartSchema = new mongoose.Schema<CartInterface>(
	{
		productId: {
			type: mongoose.Schema.ObjectId,
			ref: 'Product',
		},
		userId: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
		},
		quantity: {
			type: Number,
		},
		subTotal: {
			type: Number,
		},
	},
	{
		timestamps: true,
	}
);

export const Cart: Model<any> = mongoose.model('Cart', cartSchema);
