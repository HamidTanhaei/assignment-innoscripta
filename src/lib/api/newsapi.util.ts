import { fetchTopHeadlines, fetchSearchArticles } from "./newsapi";

interface NewsAPIParams {
    query?: string;
    category?: string;
    fromDate?: string;
    toDate?: string;
    page?: number;
    pageSize?: number;
}

export async function fetchNewsAPI(params: NewsAPIParams) {
    return (params.fromDate || params.toDate) ? fetchSearchArticles(params) : fetchTopHeadlines(params);
}