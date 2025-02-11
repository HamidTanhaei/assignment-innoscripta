import React from 'react';
import { Article } from '@/lib/api';

interface ArticleCardProps {
    article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1rem'
        }}>
            {article.imageUrl && (
                <img
                    src={article.imageUrl}
                    alt={article.title}
                    style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                />
            )}
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <p><small>{article.source}</small></p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
            </a>
        </div>
    );
};

export default ArticleCard;