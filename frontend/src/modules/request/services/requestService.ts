// frontend/src/modules/request/services/requestService.ts
import axios from 'axios';

interface MakeRequestParams {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

export const makeRequest = async ({ url, method }: MakeRequestParams) => {
  const response = await axios({
    url,
    method,
  });
  // 👇 Return an object with both data and status
  return {
    data: response.data,
    status: response.status,
  };
};