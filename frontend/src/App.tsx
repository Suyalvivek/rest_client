// frontend/src/App.tsx
import { useState } from 'react';
import HistoryList from './modules/history/components/HistoryList';
import RequestPanel from './modules/request/components/RequestPanel';
import type { HistoryEntry } from './modules/history/services/historyService';

function App() {
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE'>('GET');
  const [url, setUrl] = useState('');

  // This function will be called when a history item is clicked
  const handleHistorySelect = (item: HistoryEntry) => {
    setUrl(item.url);
    setMethod(item.method as typeof method); // Cast method to the correct type
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      <aside className="w-1/4 max-w-sm border-r border-gray-700 overflow-y-auto">
        {/* Pass the handler function down to HistoryList */}
        <HistoryList onSelectHistory={handleHistorySelect} />
      </aside>

      <main className="flex-1 flex flex-col">
        {/* Pass the state and setters down to RequestPanel */}
        <RequestPanel
          method={method}
          setMethod={setMethod}
          url={url}
          setUrl={setUrl}
        />
      </main>
    </div>
  );
}

export default App;