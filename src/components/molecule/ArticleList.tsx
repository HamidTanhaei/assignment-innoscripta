import React from 'react';
import { Article } from '@/types';
import { Alert, ArticleCard } from '../atom';

interface ArticleListProps {
    articles: Article[];
}

export const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
    if (articles.length === 0) {
        return <Alert type="info" message="No articles found. Please try different filters." />;
    }

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1rem'
        }}>
            {articles.map(article => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>
    );
};