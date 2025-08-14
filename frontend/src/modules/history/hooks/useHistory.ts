// frontend/src/modules/history/hooks/useHistory.ts
import { useQuery } from '@tanstack/react-query';
// 👇 Correct this import path
import { fetchHistory } from '../services/historyService';

export const useHistory = () => {
  return useQuery({
    queryKey: ['history'],
    queryFn: fetchHistory, // Now this is the correct function
  });
};