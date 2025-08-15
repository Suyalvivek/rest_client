// frontend/src/modules/request/components/RequestPanel.tsx
import { useState, useEffect } from 'react'; // 1. Import useEffect
import { useMutation } from '@tanstack/react-query';
import { makeRequest } from '../services/requestService';
import { useSaveHistory } from '../../history/hooks/useSaveHistory';

interface RequestPanelProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  setMethod: (method: 'GET' | 'POST' | 'PUT' | 'DELETE') => void;
  url: string;
  setUrl: (url: string) => void;
  body: string;
  setBody: (body: string) => void;
  headers: string;
  setHeaders: (headers: string) => void;
}

const RequestPanel = ({ method, setMethod, url, setUrl, body, setBody, headers, setHeaders }: RequestPanelProps) => {
  const [activeTab, setActiveTab] = useState<'body' | 'headers'>('body');
  const isGetRequest = method === 'GET';

  const saveHistoryMutation = useSaveHistory();
  const requestMutation = useMutation({
    mutationFn: makeRequest,
    onSuccess: (response) => {
      saveHistoryMutation.mutate({
        method,
        url,
        status: response.status,
        response: JSON.stringify(response.data, null, 2),
      });
    },
  });

  // 2. Add this useEffect hook
  useEffect(() => {
    // If the mutation is not idle (i.e., it has a result), reset it.
    if (!requestMutation.isIdle) {
      requestMutation.reset();
    }
  }, [url, method, body, headers]); // 3. Dependency array watches for changes

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      requestMutation.mutate({
        url,
        method,
        body: isGetRequest ? undefined : body,
        headers: isGetRequest ? undefined : headers,
      });
    }
  };

  return (
    // ... the rest of your JSX remains exactly the same
    <div className="flex flex-col h-full">
      <form onSubmit={handleSubmit} className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as typeof method)}
            className="bg-gray-800 border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://api.example.com/data"
            className="flex-1 bg-gray-800 border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={requestMutation.isPending}
            className="bg-blue-600 hover:bg-blue-700 rounded-md px-4 py-2 font-bold disabled:bg-gray-500"
          >
            {requestMutation.isPending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>

      {!isGetRequest && (
        <>
          <div className="flex border-b border-gray-700 px-2">
            <button
              type="button"
              onClick={() => setActiveTab('body')}
              className={`px-4 py-2 text-sm ${activeTab === 'body' ? 'border-b-2 border-blue-500 text-white' : 'text-gray-400'}`}
            >
              Body
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('headers')}
              className={`px-4 py-2 text-sm ${activeTab === 'headers' ? 'border-b-2 border-blue-500 text-white' : 'text-gray-400'}`}
            >
              Headers
            </button>
          </div>
          <div className="flex-grow relative">
            {activeTab === 'body' && (
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder='{ "key": "value" }'
                className="absolute inset-0 w-full h-full bg-gray-800 p-4 font-mono text-sm focus:outline-none resize-none"
              />
            )}
            {activeTab === 'headers' && (
              <textarea
                value={headers}
                onChange={(e) => setHeaders(e.target.value)}
                placeholder='{ "Authorization": "Bearer ..." }'
                className="absolute inset-0 w-full h-full bg-gray-800 p-4 font-mono text-sm focus:outline-none resize-none"
              />
            )}
          </div>
        </>
      )}

      <div className={`p-4 overflow-auto border-t border-gray-700 ${isGetRequest ? 'flex-grow' : 'h-1/2'}`}>
        <h2 className="text-lg font-bold mb-2">Response</h2>
        {requestMutation.isError && (
          <pre className="bg-red-900/50 text-red-300 p-4 rounded-md whitespace-pre-wrap break-all">
            Error: {requestMutation.error.message}
          </pre>
        )}
        {requestMutation.isSuccess && (
          <pre className="bg-gray-800 p-4 rounded-md whitespace-pre-wrap break-all">
            {JSON.stringify(requestMutation.data.data, null, 2)}
          </pre>
        )}
        {requestMutation.isIdle && (
          <p className="text-gray-500">Response will be shown here.</p>
        )}
      </div>
    </div>
  );
};

export default RequestPanel;