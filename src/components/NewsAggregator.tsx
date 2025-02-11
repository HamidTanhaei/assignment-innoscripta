"use client";

import { useState, useMemo } from 'react';
import { Article } from '@/lib/api';
import ArticleList from './ArticleList';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import styles from '../styles/Home.module.css';

interface NewsAggregatorProps {
    articles: Article[];
}

export default function NewsAggregator({ articles }: NewsAggregatorProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSource, setSelectedSource] = useState('');

    const filteredArticles = useMemo(() => {
        return articles.filter(article => {
            const matchesQuery = article.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesSource = selectedSource ? article.source === selectedSource : true;
            return matchesQuery && matchesSource;
        });
    }, [articles, searchQuery, selectedSource]);

    return (
        <div className={styles.container}>
            <h1>News Aggregator</h1>
            <SearchBar onSearch={setSearchQuery} />
            <FilterPanel selectedSource={selectedSource} onSelectSource={setSelectedSource} />
            <ArticleList articles={filteredArticles} />
        </div>
    );
}