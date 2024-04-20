import { Router } from 'express';
import { router as authRouter } from './auth.routes';
import { router as productRouter } from './product.routes';
import { router as cartRouter } from './cart.routes';
import { router as userRouter } from './user.routes';

export const router = Router();

router.use('/auth', authRouter);
router.use('/product', productRouter);
router.use('/cart', cartRouter);
router.use('/user', userRouter);
