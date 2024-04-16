import mongoose, { Model, ObjectId } from 'mongoose';

export interface OrderInterface {
	_id?: string;
	productId: ObjectId;
	userId: ObjectId;
	quantity: number;
	subTotal: number;
	paid: boolean;
	paymentType: string;
}

const orderSchema = new mongoose.Schema<OrderInterface>(
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
		paid: {
			type: Boolean,
		},
		paymentType: {
			type: String,
			enum: ['credit', 'debit', 'upi'],
		},
	},
	{
		timestamps: true,
	}
);

export const Order: Model<any> = mongoose.model('Order', orderSchema);
