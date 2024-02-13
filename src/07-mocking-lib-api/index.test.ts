import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const baseURL = 'https://jsonplaceholder.typicode.com';

jest.mock('lodash', () => ({
  throttle: jest.fn((func) => func),
}));

beforeEach(() => {
  jest.clearAllMocks();
  jest.mock('axios');

  axios.create = jest.fn().mockReturnValue({
    get: jest.fn().mockResolvedValue({ data: 'Responsed!' }),
  });
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/tests');
    expect(axios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('/tests');
    const mockInstance = axios.create();
    expect(mockInstance.get).toHaveBeenCalledWith('/tests');
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi('/tests');
    expect(result).toEqual('Responsed!');
  });
});
