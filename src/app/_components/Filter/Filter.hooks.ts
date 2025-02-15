import { useRouter } from 'next/navigation';
import { useState, useEffect, useTransition } from 'react';

interface Filters {
    q: string;
    category: string;
    date: string;
    source: string;
}

export const useFilter = (initialParams: Partial<Filters> = {}) => {
    const router = useRouter();
    const defaultFilters = {
        q: initialParams.q || '',
        category: initialParams.category || '',
        date: initialParams.date || '',
        source: initialParams.source || '',
    };

    const [filters, setFilters] = useState(defaultFilters);
    const [savedFilters, setSavedFilters] = useState<Filters | null>(null);
    const [isNavigating, startTransition] = useTransition();

    useEffect(() => {
        const saved = localStorage.getItem('savedFilters');
        if (saved) {
            setSavedFilters(JSON.parse(saved));
        }
    }, []);

    const handleSearch = (query: string) => {
        setFilters(prev => ({ ...prev, q: query }));
    };

    const handleSaveFilters = () => {
        localStorage.setItem('savedFilters', JSON.stringify(filters));
        setSavedFilters(filters);
    };

    const handleShowFeed = () => {
        const saved = JSON.parse(localStorage.getItem('savedFilters')!);
        setFilters(saved);
        const searchParams = new URLSearchParams();
        Object.entries(saved).forEach(([key, value]) => {
            if (value) searchParams.append(key, String(value));
        });
        startTransition(() => {
            router.push(`/?${searchParams.toString()}`);
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const searchParams = new URLSearchParams();
        
        Object.entries(filters).forEach(([key, value]) => {
            if (value) searchParams.append(key, value);
        });

        startTransition(() => {
            router.push(`/?${searchParams.toString()}`);
        });
    };

    const hasFilters = Object.values(filters).some(value => value !== '');
    const isFiltersSaved = savedFilters && 
        Object.entries(defaultFilters).every(([key, value]) => savedFilters[key as keyof typeof savedFilters] === value);
    const isFormDirty = Object.entries(filters).some(
        ([key, value]) => value !== defaultFilters[key as keyof typeof defaultFilters]
    );
    const showMyFeedButton = savedFilters && 
        Object.entries(defaultFilters).some(([key, value]) => savedFilters[key as keyof typeof savedFilters] !== value);

    return {
        filters,
        setFilters,
        isNavigating,
        hasFilters,
        isFiltersSaved,
        isFormDirty,
        showMyFeedButton,
        handleSearch,
        handleSaveFilters,
        handleShowFeed,
        handleSubmit
    };
}; 