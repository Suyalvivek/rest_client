import { Router } from 'express';
import  historyRoutes  from './historyRoutes';
export const indexRoute = Router();
indexRoute.use('/history', historyRoutes);