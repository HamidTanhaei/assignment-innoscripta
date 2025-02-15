import type { Article as OutputArticle } from '@/types';
import type { NewsAPIResponse } from '@/lib/api/newsapi';
import { GuardianAPIResponse } from '@/lib/api/guardian';
import { NYTimesAPIResponse } from '@/lib/api/nytimes';

function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '');
}

export function convertNewsAPIResponse(response: NewsAPIResponse['articles']): OutputArticle[] {
    return response.map((article): OutputArticle => ({
        id: article.url,
        title: article.title,
        description: article.description,
        source: article.source.name,
        publishedAt: article.publishedAt,
        url: article.url,
        imageUrl: article.urlToImage || undefined,
        apiSource: 'Newsapi',
    }));
}

export function convertGuardianAPIResponse(response: GuardianAPIResponse['response']['results']): OutputArticle[] {
    return response.map((article): OutputArticle => ({
        id: article.webUrl,
        title: article.webTitle,
        description: stripHtml(article.fields?.trailText || ''),
        source: 'Guardian',
        publishedAt: article.webPublicationDate,
        url: article.webUrl,
        imageUrl: article.fields?.thumbnail || undefined,
        apiSource: 'Guardian',
    }));
}

export function convertNYTimesAPIResponse(response: NYTimesAPIResponse['response']['docs']): OutputArticle[] {
    return response.map((article): OutputArticle => ({
        id: article['_id'],
        title: article.headline.main,
        description: article.abstract,
        source: article.source,
        publishedAt: article.pub_date,
        url: article.web_url,
        imageUrl: article.multimedia?.length ? 'https://www.nytimes.com/' + article.multimedia?.filter(m => m.type === 'image')?.[0]?.url : undefined,
        apiSource: 'NYTimes',
    }));
}

