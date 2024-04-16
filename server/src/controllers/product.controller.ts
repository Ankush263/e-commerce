import { Product, ProductInterface } from '../models/product.model';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import { NextFunction, Request, Response } from 'express';
import { deleteOne, getAll, getOne, updateOne } from './factory.controller';
import { uploadImageForProducts } from '../middleware/s3bucket';
import { s3 } from '../middleware/s3';

export const uploadImage = uploadImageForProducts.single('image');

export const createProduct = catchAsync(
	async (req: Request | any, res: Response, next: NextFunction) => {
		const { name, description, quantity, variation, price } = req.body;

		const key = req.file.key;
		const url = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${key}`;

		const product: ProductInterface = await Product.create({
			name,
			description,
			image: url,
			quantity,
			variation,
			price,
		});

		if (!product) {
			return next(new AppError('Product does not created', 404));
		}

		res.status(200).json({
			status: 'success',
			data: product,
		});
	}
);

export const getAllProducts = getAll(Product);

export const getOneProduct = getOne(Product);

export const updateProduct = updateOne(Product);

export const deleteImage = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const product = await Product.findById(req.params.id);

		const parts = product.image.split(
			`https://${process.env.BUCKET_NAME}.s3.amazonaws.com/`
		);
		const key = parts[1];

		const params = {
			Bucket: `${process.env.BUCKET_NAME}`,
			Key: key,
		};
		s3.deleteObject(params, (err, data) => {
			if (err) {
				console.log(err);
			} else {
				console.log(data);
			}
		});
		next();
	}
);

export const deleteProduct = deleteOne(Product);
