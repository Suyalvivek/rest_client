// frontend/src/modules/request/components/RequestPanel.tsx
import { useMutation } from '@tanstack/react-query';
import { makeRequest } from '../services/requestService';
import { useSaveHistory } from '../../history/hooks/useSaveHistory';

// Define the component's props
interface RequestPanelProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  setMethod: (method: 'GET' | 'POST' | 'PUT' | 'DELETE') => void;
  url: string;
  setUrl: (url: string) => void;
}

const RequestPanel = ({ method, setMethod, url, setUrl }: RequestPanelProps) => {
  // Local state for method and url is now removed. We use props instead.
  
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      requestMutation.mutate({ url, method });
    }
  };

  // The rest of the JSX is the same, it just uses props now.
  return (
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

      <div className="p-4 flex-grow overflow-auto">
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