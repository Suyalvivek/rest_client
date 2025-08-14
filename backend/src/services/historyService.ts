// backend/src/services/history.service.ts
import { getORM } from '../shared/utils/db/connection';
import { RequestHistory, CreateHistoryDto } from '../shared/types/RequestHistory';

export const createHistory = async (data: CreateHistoryDto): Promise<RequestHistory> => {
  const orm = getORM();
  const em = orm.em.fork();

  // Change these two lines 👇
  const newHistoryEntry = new RequestHistory();
  Object.assign(newHistoryEntry, data);

  // The rest of the function stays the same
  await em.persistAndFlush(newHistoryEntry);
  
  return newHistoryEntry;
};
export const getHistory = async (
  limit: number,
  offset: number
): Promise<{ entries: RequestHistory[]; total: number }> => {
  const orm = getORM();
  const em = orm.em.fork();

  const [entries, total] = await em.findAndCount(
    RequestHistory,
    {}, // No specific conditions, find all
    {
      orderBy: { createdAt: 'DESC' }, // Show newest first
      limit,
      offset,
    }
  );

  return { entries, total };
};