import { Router } from 'express';
import { generateCv } from '../controllers/cvController';

const router = Router();
router.post('/generate', generateCv);

export default router;
