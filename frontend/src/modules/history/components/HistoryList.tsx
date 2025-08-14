// frontend/src/modules/history/components/HistoryList.tsx
import { useHistory } from '../hooks/useHistory';
import type { HistoryEntry } from '../services/historyService';

// Define the component's props
interface HistoryListProps {
  onSelectHistory: (item: HistoryEntry) => void;
}

const HistoryList = ({ onSelectHistory }: HistoryListProps) => {
  const { data, isLoading, isError, error } = useHistory();

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Request History</h2>
      
      {isLoading && <p>Loading history...</p>}
      {isError && <p className="text-red-400">Error: {error.message}</p>}

      {data && (
        <ul>
          {data.data.map((item) => (
            <li
              key={item.id}
              className="p-2 mb-2 rounded-md hover:bg-gray-700 cursor-pointer"
              // Add the onClick handler here 👇
              onClick={() => onSelectHistory(item)}
            >
              <span
                className={`font-bold mr-2 ${
                  item.method === 'GET' ? 'text-green-400' : 'text-blue-400'
                }`}
              >
                {item.method}
              </span>
              <span className="text-gray-300 truncate block">{item.url}</span>
            </li>
          ))}
          {data.data.length === 0 && (
            <p className="text-gray-500">No history found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default HistoryList;