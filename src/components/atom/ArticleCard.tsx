import React from 'react';
import { Article } from '@/types';

interface ArticleCardProps {
    article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col h-full">
            {article.imageUrl && (
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <img
                        className="rounded-t-lg aspect-video object-cover"
                        src={article.imageUrl}
                        alt={article.title}
                    /   >
                </a>
            )}
            <div className="p-5 flex-grow">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {article.title}
                    </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {article.description}
                </p>
                <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700"
                >
                    Learn more
                    <svg className="w-2.5 h-2.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                </a>
            </div>
            <div className="mt-auto">
                    <div className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 py-2 px-5">
                        <p>
                            {new Date(article.publishedAt).toLocaleDateString()}
                            <br />
                            Source: {article.source}
                            <br />
                            API Source: {article.apiSource}
                        </p>
                    </div>
                </div>
            </div>
    );
};

export default ArticleCard;