import { convertGuardianAPIResponse, convertNYTimesAPIResponse, convertNewsAPIResponse } from "./getPageData.utils";
import { fetchNewsAPI, fetchGuardianArticles,  fetchNYTimesArticles} from "@/lib/api";
import { getDateRange } from '@/lib';
import { Article } from "@/types";
import { APIResult } from "../types";

export const getArticles = async (params: Partial<{q: string, category: string, date: string, source: string, page: number}>): Promise<APIResult> => {
  const { q, category, date, page, source } = params;
  const dateRange = getDateRange(date); // YYYY-MM-DD

  const apiCalls = [];
  const apiSources: string[] = [];

  if (!source || source === 'newsapi') {
    apiSources.push('newsapi');
    apiCalls.push(
      fetchNewsAPI({
        ...(q && { query: q }),
        ...(category && { category: category }),
        ...(dateRange && { fromDate: dateRange.fromDate, toDate: dateRange.toDate }),
        page: page || 1,
        pageSize: 10,
      }).then(convertNewsAPIResponse)
    );
  }

  if (!source || source === 'guardian') {
    apiSources.push('guardian');
    apiCalls.push(
      fetchGuardianArticles({
        ...(q && { query: q }),
        ...(category && { section: category }),
        ...(dateRange && { fromDate: dateRange.fromDate, toDate: dateRange.toDate }),
        page: page || 1,
        pageSize: 10,
      }).then(convertGuardianAPIResponse)
    );
  }

  if (!source || source === 'nytimes') {
    apiSources.push('nytimes');
    apiCalls.push(
      fetchNYTimesArticles({
        ...(q && { query: q }),
        ...(category && { category: category }),
        ...(dateRange && { fromDate: dateRange.fromDate.replace(/-/g, ""), toDate: dateRange.toDate.replace(/-/g, "") }),
        page: page || 1,
      }).then(convertNYTimesAPIResponse)
    );
  }

  const results = await Promise.allSettled(apiCalls);
  
  const errors: APIResult['errors'] = [];
  const articles: Article[] = [];

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      articles.push(...result.value);
    } else {
      errors.push({
        source: apiSources[index]
      });
    }
  });

  return {
    apiSources,
    articles,
    ...(errors.length > 0 && { errors })
  };
}