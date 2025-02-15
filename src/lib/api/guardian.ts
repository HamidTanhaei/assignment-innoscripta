import { fetchTyped } from "../fetchTyped";

interface GuardianArticle {
    id: string;
    type: string;
    sectionId: string;
    sectionName: string;
    webPublicationDate: string;
    webTitle: string;
    webUrl: string;
    fields?: {
        headline?: string;
        thumbnail?: string;
        bodyText?: string;
        trailText?: string;
    };
}

export interface GuardianAPIResponse {
    response: {
        status: string;
        total: number;
        results: GuardianArticle[];
    };
}

interface FetchGuardianParams {
    query?: string;
    section?: string;
    tag?: string;
    pageSize?: number;
    page?: number;
    fromDate?: string;
    toDate?: string;
}

// https://open-platform.theguardian.com/documentation/
export async function fetchGuardianArticles(params: FetchGuardianParams): Promise<GuardianArticle[]> {
    const { query, section, tag, pageSize = 10, page = 1, fromDate, toDate } = params;

    const baseUrl = "https://content.guardianapis.com/search";

    const queryParams = new URLSearchParams({
        "api-key": process.env.API_KEY_GUARDIAN!,
        ...(query ? {q: query} : {}),
        ...(section ? {section} : {}),
        ...(tag ? {tag} : {}),
        ...(fromDate ? {"from-date": fromDate} : {}),
        ...(toDate ? {"to-date": toDate} : {}),
        "page-size": pageSize.toString(),
        "page": page.toString(),
        "show-fields": "headline,thumbnail,bodyText,trailText",
    });
    
    const data = await fetchTyped<GuardianAPIResponse>(`${baseUrl}?${queryParams.toString()}`);
    return data.response.results;
}