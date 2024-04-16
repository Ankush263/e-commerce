import { Router } from 'express';
import { restrictTo, protect } from '../controllers/auth.controller';
import {
	createProduct,
	getAllProducts,
	getOneProduct,
	updateProduct,
	deleteProduct,
	uploadImage,
	deleteImage,
} from '../controllers/product.controller';

export const router = Router();

router
	.route('/')
	.post(protect, restrictTo('admin'), uploadImage, createProduct)
	.get(getAllProducts);
router
	.route('/:id')
	.get(getOneProduct)
	.patch(protect, restrictTo('admin'), updateProduct)
	.delete(protect, restrictTo('admin'), deleteImage, deleteProduct);
