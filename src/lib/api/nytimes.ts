import { fetchTyped } from "../fetchTyped";

export interface NYTimesArticle {
    uri: string;
    url: string;
    _id: string;
    source: string;
    pub_date: string;
    headline: { main: string };
    web_url: string;
    section: string;
    title: string;
    abstract: string;
    multimedia?: { url: string, type: string }[];
}

export interface NYTimesAPIResponse {
    status: string;
    response: {
        docs: NYTimesArticle[];
    };
}

export interface FetchNYTimesParams {
    query?: string;
    section?: string;
    author?: string;
    page?: number;
    fromDate?: string;
    toDate?: string;
}


// https://newsapi.org/docs/endpoints/top-headlines
export async function fetchNYTimesArticles(params: FetchNYTimesParams): Promise<NYTimesArticle[]> {
    const { query, section, author, page = 0, fromDate, toDate } = params;

    const baseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    const queryParams = new URLSearchParams({
        "api-key": process.env.API_KEY_NYTIME!,
        q: query || "",
        page: page.toString(),
        ...(fromDate ? {begin_date: fromDate} : {}),
        ...(toDate ? {end_date: toDate} : {}),
    });

    const filters = [
        section ? `section_name:("${section}")` : "",
        author ? `byline:("${author}")` : ""
    ].filter(Boolean);

    if (filters.length > 0) {
        queryParams.append("fq", filters.join(" AND "));
    }

    console.log('`${baseUrl}?${queryParams.toString()}`', `${baseUrl}?${queryParams.toString()}`);

    const data = await fetchTyped<NYTimesAPIResponse>(`${baseUrl}?${queryParams.toString()}`);
    return data.response.docs;
}