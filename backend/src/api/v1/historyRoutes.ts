import { Router } from 'express';
import { createHistoryEntry, getHistoryEntries } from '../../controller/historyController';

const router = Router();
router.get('/',getHistoryEntries)
router.post('/', createHistoryEntry);
export default router;