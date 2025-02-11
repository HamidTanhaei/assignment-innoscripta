export interface Article {
    id: string;
    title: string;
    description: string;
    source: string;
    publishedAt: string;
    url: string;
    imageUrl?: string;
}

// Dummy function simulating fetching articles from NewsAPI
export async function fetchNewsAPIArticles(query: string): Promise<Article[]> {
    // In a real application, you would call the NewsAPI endpoint here.
    return [
        {
            id: 'newsapi-1',
            title: 'NewsAPI: Breaking News Article',
            description: 'This is a breaking news article from NewsAPI.',
            source: 'NewsAPI',
            publishedAt: new Date().toISOString(),
            url: 'https://newsapi.org/article1',
            imageUrl: 'https://via.placeholder.com/150'
        }
    ];
}

// Dummy function simulating fetching articles from The Guardian
export async function fetchGuardianArticles(query: string): Promise<Article[]> {
    return [
        {
            id: 'guardian-1',
            title: 'The Guardian: World News Update',
            description: 'Latest updates from around the world by The Guardian.',
            source: 'The Guardian',
            publishedAt: new Date().toISOString(),
            url: 'https://theguardian.com/article1',
            imageUrl: 'https://via.placeholder.com/150'
        }
    ];
}

// Dummy function simulating fetching articles from BBC News
export async function fetchBBCArticles(query: string): Promise<Article[]> {
    return [
        {
            id: 'bbc-1',
            title: 'BBC News: Top Stories',
            description: 'Top stories from BBC News.',
            source: 'BBC News',
            publishedAt: new Date().toISOString(),
            url: 'https://bbc.com/article1',
            imageUrl: 'https://via.placeholder.com/150'
        }
    ];
}