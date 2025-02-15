'use client';

import React, { ChangeEvent } from 'react';
import { FormInput } from '@/components/atom';

interface SearchBarProps {
    onSearch: (query: string) => void;
    value?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, value = '' }) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    };

    return (
        <FormInput 
            onChange={handleInputChange} 
            placeholder="Search articles..." 
            value={value}
        />
    );
};

export default SearchBar;