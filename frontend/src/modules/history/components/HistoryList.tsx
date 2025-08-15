// frontend/src/modules/history/components/HistoryList.tsx
import { useHistory } from '../hooks/useHistory';
import type { HistoryEntry } from '../services/historyService';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

interface HistoryListProps {
  onSelectHistory: (item: HistoryEntry) => void;
}

// Helper function to get the right color for each method
const getMethodClass = (method: string) => {
  switch (method.toUpperCase()) {
    case 'GET':
      return 'text-green-400';
    case 'POST':
      return 'text-blue-400';
    case 'PUT':
      return 'text-yellow-400';
    case 'PATCH':
      return 'text-yellow-400';
    case 'DELETE':
      return 'text-red-400';
    default:
      return 'text-gray-400';
  }
};

const Row = ({ index, style, data }: { index: number, style: React.CSSProperties, data: any }) => {
  const item = data.items[index];
  const onSelectHistory = data.onSelectHistory;

  return (
    <div style={style}>
      <li
        className="p-2 mb-2 rounded-md hover:bg-gray-700 cursor-pointer mx-2"
        onClick={() => onSelectHistory(item)}
      >
        <span className={`font-bold mr-2 w-16 inline-block ${getMethodClass(item.method)}`}>
          {item.method}
        </span>
        <span className="text-gray-300 truncate block">{item.url}</span>
      </li>
    </div>
  );
};

const HistoryList = ({ onSelectHistory }: HistoryListProps) => {
  const { data, isLoading, isError, error } = useHistory();

  if (isLoading) return <p className="p-4">Loading history...</p>;
  if (isError) return <p className="p-4 text-red-400">Error: {error.message}</p>;

  return (
    <div className="h-full w-full p-2">
      <h2 className="text-lg font-bold mb-4 px-2">Request History</h2>
      {data && data.data.length === 0 && (
        <p className="text-gray-500 px-2">No history found.</p>
      )}
      <div className="h-[calc(100%-40px)]">
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              itemCount={data?.data.length || 0}
              itemSize={60}
              itemData={{ items: data?.data, onSelectHistory }}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  );
};

export default HistoryList;