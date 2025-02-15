import { vi } from 'vitest';

import { fetchTyped } from './fetchType';

describe('fetchTyped', () => {
  const mockUrl = 'https://api.example.com/resource';
  const mockResponse = { id: 1, name: 'Test Resource' };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should fetch and return the typed data on a successful response', async () => {
    // Mock `fetch` to return a successful response
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
        headers: new Headers({ 'Content-Type': 'application/json' }),
      } as Response),
    );

    const result = await fetchTyped<typeof mockResponse>(mockUrl);

    // Assertions
    expect(fetch).toHaveBeenCalledWith(mockUrl, undefined);
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error with details on a failed response', async () => {
    const errorDetails = { message: 'Not found' };

    // Mock `fetch` to return a failed response
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: () => Promise.resolve(errorDetails),
        headers: new Headers({ 'Content-Type': 'application/json' }),
      } as Response),
    );

    await expect(fetchTyped(mockUrl)).rejects.toThrow(
      `HTTP error! Status: 404 Not Found. Details: ${JSON.stringify(errorDetails)}`,
    );

    expect(fetch).toHaveBeenCalledWith(mockUrl, undefined);
  });

  it('should throw an error with plain text details on a failed response', async () => {
    const errorText = 'Service unavailable';

    // Mock `fetch` to return a failed response with plain text
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 503,
        statusText: 'Service Unavailable',
        text: () => Promise.resolve(errorText),
        headers: new Headers({ 'Content-Type': 'text/plain' }),
      } as Response),
    );

    await expect(fetchTyped(mockUrl)).rejects.toThrow(
      `HTTP error! Status: 503 Service Unavailable. Details: "${errorText}"`,
    );

    expect(fetch).toHaveBeenCalledWith(mockUrl, undefined);
  });

  it('should throw an error if the response cannot be parsed as JSON', async () => {
    // Mock `fetch` to return an invalid JSON response
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.reject(new Error('Invalid JSON')),
      } as Response),
    );

    await expect(fetchTyped(mockUrl)).rejects.toThrow('Failed to parse response as JSON.');

    expect(fetch).toHaveBeenCalledWith(mockUrl, undefined);
  });

  it('should pass options to fetch', async () => {
    const mockOptions: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'value' }),
    };

    // Mock `fetch` to return a successful response
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
        headers: new Headers({ 'Content-Type': 'application/json' }),
      } as Response),
    );

    const result = await fetchTyped<typeof mockResponse>(mockUrl, mockOptions);

    expect(fetch).toHaveBeenCalledWith(mockUrl, mockOptions);
    expect(result).toEqual(mockResponse);
  });
});
