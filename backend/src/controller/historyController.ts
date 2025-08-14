// backend/src/controller/history.controller.ts
import { Request, Response } from 'express';
import * as HistoryService from '../services/historyService';

export const createHistoryEntry = async (req: Request, res: Response) => {
  try {
    // Basic validation to ensure we have a body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Request body cannot be empty.' });
    }
    
    const newEntry = await HistoryService.createHistory(req.body);
    res.status(201).json(newEntry);
  } catch (error) {
    console.error('Error creating history entry:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
export const getHistoryEntries = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const { entries, total } = await HistoryService.getHistory(limit, offset);

    res.status(200).json({
      data: entries,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalEntries: total,
    });
  } catch (error) {
    console.error('Error fetching history entries:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};