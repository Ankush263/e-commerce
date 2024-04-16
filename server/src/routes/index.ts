import { Router } from 'express';
import { router as authRouter } from './auth.routes';
import { router as productRouter } from './product.routes';

export const router = Router();

router.use('/auth', authRouter);
router.use('/product', productRouter);
