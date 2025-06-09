import { Router } from 'express';
import { generateCv } from '../controllers/cvController';
import { saveCvData, loadCvData } from '../controllers/cvController';

const router = Router();
router.post('/generate', generateCv);
router.post('/save', saveCvData);
router.get('/load/:email', loadCvData);

export default router;
