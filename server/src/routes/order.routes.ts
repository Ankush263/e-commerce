import { Router } from 'express';
import { restrictTo, protect } from '../controllers/auth.controller';
import {
	createOrder,
	deleteOrder,
	getAllOrder,
} from '../controllers/order.controller';

export const router = Router();

router
	.route('/')
	.post(protect, restrictTo('customer'), createOrder)
	.get(protect, restrictTo('customer'), getAllOrder);

router.route('/:id').patch(protect, restrictTo('customer'), deleteOrder);
