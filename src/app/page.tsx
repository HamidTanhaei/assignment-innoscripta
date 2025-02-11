import { fetchNewsAPIArticles, fetchGuardianArticles, fetchBBCArticles, Article } from '@/lib/api';
import NewsAggregator from '@/components/NewsAggregator';

export default async function Page() {
  // Fetch articles concurrently from three sources
  const [newsAPIArticles, guardianArticles, bbcArticles] = await Promise.all([
    fetchNewsAPIArticles(''),
    fetchGuardianArticles(''),
    fetchBBCArticles('')
  ]);

  const articles: Article[] = [...newsAPIArticles, ...guardianArticles, ...bbcArticles];

  return <NewsAggregator articles={articles} />;
}