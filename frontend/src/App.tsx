// frontend/src/App.tsx
import { useState } from 'react';
import HistoryList from './modules/history/components/HistoryList';
import RequestPanel from './modules/request/components/RequestPanel';
import type { HistoryEntry } from './modules/history/services/historyService';

function App() {
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE'>('GET');
  const [url, setUrl] = useState('');
  const [body, setBody] = useState('');
  const [headers, setHeaders] = useState('');

  const handleHistorySelect = (item: HistoryEntry) => {
    setUrl(item.url);
    setMethod(item.method as typeof method);
    // When history is clicked, clear body/headers for simplicity,
    // as we aren't saving them yet.
    setBody('');
    setHeaders('');
  };

  return (
    // On small screens, use a vertical column layout (`flex-col`).
    // On medium screens and up (`md:`), switch to a horizontal row layout (`md:flex-row`).
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white font-sans">
      
      {/* History Sidebar */}
      {/* On small screens, be full-width (`w-full`) and 1/3 of the screen height (`h-1/3`). */}
      {/* On medium screens (`md:`), switch to sidebar mode. */}
      <aside className="w-full h-1/3 md:w-1/4 md:max-w-sm md:h-screen border-b md:border-b-0 md:border-r border-gray-700 overflow-y-auto">
        <HistoryList onSelectHistory={handleHistorySelect} />
      </aside>

      {/* Main Content */}
      {/* The `flex-1` class works for both flex directions, taking up the remaining space. */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <RequestPanel
          method={method}
          setMethod={setMethod}
          url={url}
          setUrl={setUrl}
          body={body}
          setBody={setBody}
          headers={headers}
          setHeaders={setHeaders}
        />
      </main>
    </div>
  );
}

export default App;