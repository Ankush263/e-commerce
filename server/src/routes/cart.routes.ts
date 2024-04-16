import { Router } from 'express';
import { restrictTo, protect } from '../controllers/auth.controller';
import {
	createCart,
	getMyCart,
	removeItemByOne,
	deleteItem,
} from '../controllers/cart.controllers';

export const router = Router();

router
	.route('/')
	.post(protect, restrictTo('customer'), createCart)
	.get(protect, restrictTo('customer'), getMyCart);

router
	.route('/:id')
	.patch(protect, restrictTo('customer'), removeItemByOne)
	.delete(protect, restrictTo('customer'), deleteItem);
