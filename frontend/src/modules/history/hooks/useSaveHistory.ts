// frontend/src/modules/history/hooks/useSaveHistory.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveHistoryEntry } from '../services/historyService';

export const useSaveHistory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveHistoryEntry,
    onSuccess: () => {
      // When a save is successful, invalidate the ['history'] query.
      // This tells React Query to refetch the history list automatically.
      queryClient.invalidateQueries({ queryKey: ['history'] });
    },
  });
};