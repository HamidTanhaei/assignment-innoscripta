import { ArticleList } from '@/components/molecule';
import { Alert } from '@/components/atom';
import { getArticles } from './_libs/getPageData';
import { Filter } from './_components';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Partial<{q: string, category: string, date: string, source: string, page: number}>>;
}) {
  const params = await searchParams;
  const articles = await getArticles(params);

  const allHaveError = articles.errors && articles.errors.length === 3;

  return (
    <>
      <Filter params={params} />
      {articles.errors && (
        articles.errors.map((error) => (
          <Alert key={error.source} type="danger" title={`Error fetching`} message={error.source} className="mt-4" />
        ))
      )}
      {!allHaveError && (
        <ArticleList articles={articles.articles} />
      )}
    </>
  );
};