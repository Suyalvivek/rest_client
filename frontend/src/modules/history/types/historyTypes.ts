// frontend/src/modules/history/types/HistoryTypes.ts
// This re-exports the types from the service file so they can be used elsewhere
export * from '../services/historyService'; 

// This is the shape of the data we send to the backend to create an entry
export type CreateHistoryDto = {
  method: string;
  url: string;
  status: number;
  response?: string;
};