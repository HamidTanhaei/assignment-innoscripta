import { fetchTyped } from "../fetchTyped";

interface Article {
    source: { id: string | null; name: string };
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    
    content: string | null;
}

export interface NewsAPIResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}

interface TopHeadlinesParams {
    query?: string;
    category?: string;
    page?: number;
    pageSize?: number;
}

interface SearchArticlesParams {
    query?: string;  // Required for everything endpoint
    fromDate?: string;
    toDate?: string;
    page?: number;
    pageSize?: number;
}

// https://newsapi.org/docs/endpoints
export async function fetchTopHeadlines(params: TopHeadlinesParams) {
    const { query, category, page = 1, pageSize = 20 } = params;
    
    const baseUrl = "https://newsapi.org/v2/top-headlines";
    const queryParams = new URLSearchParams({
        apiKey: process.env.API_KEY_NEWS_API!,
        language: "en",
        page: page.toString(),
        pageSize: pageSize.toString(),
        ...(query ? {q: query} : {}),
        ...(category ? {category} : {}),
    });

    const data = await fetchTyped<NewsAPIResponse>(`${baseUrl}?${queryParams.toString()}`);
    return data.articles;
}

export async function fetchSearchArticles(params: SearchArticlesParams) {
    const { query, fromDate, toDate, page = 1, pageSize = 20 } = params;
    
    const baseUrl = "https://newsapi.org/v2/everything";
    const queryParams = new URLSearchParams({
        apiKey: process.env.API_KEY_NEWS_API!,
        language: "en",
        page: page.toString(),
        pageSize: pageSize.toString(),
        ...(query ? { q: query } : {}),
        ...(fromDate ? {from: fromDate} : {}),
        ...(toDate ? {to: toDate} : {}),
    });
    
    console.log('`${baseUrl}?${queryParams.toString()}`', `${baseUrl}?${queryParams.toString()}`)
    const data = await fetchTyped<NewsAPIResponse>(`${baseUrl}?${queryParams.toString()}`);
    return data.articles;
}

