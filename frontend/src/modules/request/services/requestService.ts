// frontend/src/modules/request/services/requestService.ts
import axios from 'axios';

interface MakeRequestParams {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: string;
  headers?: string;
}

export const makeRequest = async ({ url, method, body, headers }: MakeRequestParams) => {
  try {
    const data = body ? JSON.parse(body) : undefined;
    const customHeaders = headers ? JSON.parse(headers) : undefined;

    const response = await axios({
      url,
      method,
      data,
      headers: customHeaders,
    });

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    // Check if the error is from axios and has a response
    if (axios.isAxiosError(error) && error.response) {
      // It's a valid HTTP error (like 404, 500), so we return its data
      return {
        data: error.response.data,
        status: error.response.status,
      };
    }

    // It's a syntax error (invalid JSON) or a network error
    if (error instanceof SyntaxError) {
      throw new Error(`Invalid JSON in request: ${error.message}`);
    }

    // Re-throw other errors to be handled by React Query's isError state
    throw error;
  }
};