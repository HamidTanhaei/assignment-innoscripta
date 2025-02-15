/**
 * A generic fetch function that parses the response as JSON and returns it typed as T.
 *
 * @template T - The expected response type.
 * @param url - The endpoint URL.
 * @param options - Fetch options (method, headers, body, etc.).
 * @returns A promise resolving to the parsed JSON response typed as T.
 * @throws Will throw an error if the response is not ok or if parsing fails.
 */
export async function fetchTyped<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    // Attempt to extract error details from the response
    let errorDetails: string | Record<string, never>;
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      errorDetails = await response.json();
    } else {
      errorDetails = await response.text();
    }

    throw new Error(
      `HTTP error! Status: ${response.status} ${response.statusText}. Details: ${JSON.stringify(errorDetails)}`,
    );
  }

  try {
    const data: T = await response.json();
    return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    throw new Error('Failed to parse response as JSON.');
  }
}
