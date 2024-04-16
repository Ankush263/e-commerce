import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import { Cart, CartInterface } from '../models/cart.model';
import { Product, ProductInterface } from '../models/product.model';
import { Request, Response, NextFunction } from 'express';

export const createCart = catchAsync(
	async (req: Request | any, res: Response, next: NextFunction) => {
		const { productId, quantity } = req.body;
		const product: ProductInterface = await Product.findById(productId);

		if (!product) {
			return next(new AppError(`Product does not exists with that id`, 404));
		}

		const subTotal: number = product.price * parseInt(quantity);
		const cart: CartInterface = await Cart.create({
			productId,
			quantity,
			userId: req.user.id,
			subTotal,
		});

		res.status(200).json({
			status: 'success',
			data: cart,
		});
	}
);

export const getMyCart = catchAsync(
	async (req: Request | any, res: Response, next: NextFunction) => {
		const cart: CartInterface[] = await Cart.find({
			userId: req.user.id,
		}).populate({
			path: 'productId',
			select: 'name image price',
		});

		let total: number = 0;
		cart.map((item) => {
			total += item.subTotal;
		});

		res.status(200).json({
			status: 'success',
			data: cart,
			total,
		});
	}
);

export const removeItemByOne = catchAsync(
	async (req: Request | any, res: Response, next: NextFunction) => {
		const cartItem = await Cart.findOne({
			userId: req.user.id,
			productId: req.params.id,
		});

		if (cartItem.userId.toString() !== req.user.id.toString()) {
			return next(new AppError(`You aren't the owner of this cart`, 404));
		}

		if (!cartItem) {
			return next(
				new AppError(
					`Product with ID ${req.params.id} does not exist in your cart`,
					404
				)
			);
		}

		if (cartItem.quantity > 1) {
			const product = await Product.findById(req.params.id);
			cartItem.quantity -= 1;
			cartItem.subTotal = cartItem.subTotal - product.price;
			await cartItem.save();
		} else {
			await Cart.deleteOne({ _id: cartItem._id });
		}

		const updatedCart = await Cart.find({
			userId: req.user.id,
		});

		res.status(200).json({
			status: 'success',
			data: updatedCart,
		});
	}
);

export const deleteItem = catchAsync(
	async (req: Request | any, res: Response, next: NextFunction) => {
		const cartItem = await Cart.findOne({
			userId: req.user.id,
			productId: req.params.id,
		});

		if (cartItem.userId.toString() !== req.user.id.toString()) {
			return next(new AppError(`You aren't the owner of this cart`, 404));
		}

		if (!cartItem) {
			return next(
				new AppError(
					`Product with ID ${req.params.id} does not exist in your cart`,
					404
				)
			);
		}

		await Cart.deleteOne({ _id: cartItem._id });

		const updatedCart = await Cart.find({
			userId: req.user.id,
		});

		res.status(200).json({
			status: 'success',
			data: updatedCart,
		});
	}
);
