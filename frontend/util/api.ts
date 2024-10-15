const BASE_URL = 'http://localhost:8080'

export default async function ApiRequest(url: string, data: RequestInit) {
    const response = await fetch(`${BASE_URL}${url}`, data);
    if (!response.ok) {
        throw new Error(await response.text());
    }
    const contentLength = response.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) === 0) {
        return null;
    }
    return response.json();
}