import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import { Order, OrderInterface } from '../models/order.model';
import { Product, ProductInterface } from '../models/product.model';
import { NextFunction, Request, Response } from 'express';
import { deleteOne, getAll } from './factory.controller';

export const createOrder = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { productId, quantity, paid, paymentType } = req.body;
		const product: ProductInterface = await Product.findById(productId);
		if (!product) {
			return next(new AppError(`Product with that id does not exists`, 404));
		}

		const subTotal = quantity * product.price;
		const order: OrderInterface = await Order.create({
			productId,
			quantity,
			paid,
			paymentType,
			subTotal,
		});

		res.status(200).json({
			status: 'success',
			data: order,
		});
	}
);

export const deleteOrder = deleteOne(Order);

export const getAllOrder = getAll(Order);
