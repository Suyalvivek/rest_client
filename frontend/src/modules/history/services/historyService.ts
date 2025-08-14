// frontend/src/modules/history/services/historyService.ts
import apiClient from '../../../shared/api/client';
import type { CreateHistoryDto } from '../types/historyTypes';
// Define the shape of a single history entry
export interface HistoryEntry {
  id: number;
  method: string;
  url: string;
  status: number;
  createdAt: string;
}

// Define the shape of the API response from our paginated endpoint
export interface PaginatedHistoryResponse {
  data: HistoryEntry[];
  totalPages: number;
  currentPage: number;
  totalEntries: number;
}

// The function that fetches the data
export const fetchHistory = async (): Promise<PaginatedHistoryResponse> => {
  const { data } = await apiClient.get('/history');
  return data;
};
export const saveHistoryEntry = async (entry: CreateHistoryDto) => {
    const { data } = await apiClient.post('/history', entry);
    return data;
  };