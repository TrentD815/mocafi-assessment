import { Router } from 'express';
import { getBalance } from '../controllers/accountController';

const router = Router();

router.get('/balance/:cardNumber', getBalance);

export default router;