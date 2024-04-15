import { Router } from 'express';
import { signup, login } from '../controllers/auth.controller';

export const router = Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
