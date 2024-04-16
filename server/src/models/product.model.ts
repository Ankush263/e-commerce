import mongoose, { Model, ObjectId } from 'mongoose';

export interface ProductInterface {
	_id?: string;
	admin: ObjectId;
	name: string;
	description: string;
	image: string;
	quantity: number;
	variation: string[];
	price: number;
}

const productSchema = new mongoose.Schema<ProductInterface>(
	{
		admin: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
		},
		name: {
			type: String,
			required: [true, 'Must provide product name'],
		},
		description: {
			type: String,
		},
		image: {
			type: String,
		},
		quantity: {
			type: Number,
			required: [true, 'Must provide product quantity'],
		},
		variation: {
			type: [String],
		},
		price: {
			type: Number,
			required: [true, 'Must provide product price'],
			min: [1, 'Price must be greater than 1'],
		},
	},
	{
		timestamps: true,
	}
);

export const Product: Model<any> = mongoose.model('Product', productSchema);
