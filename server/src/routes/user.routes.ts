import { Router } from 'express';
import { getAllUsers } from '../controllers/user.controller';

export const router = Router();

router.route('/').get(getAllUsers);
