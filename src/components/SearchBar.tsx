import React, { ChangeEvent } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    };

    return (
        <div style={{ marginBottom: '1rem' }}>
            <input
                type="text"
                placeholder="Search articles..."
                onChange={handleInputChange}
                style={{
                    width: '100%',
                    padding: '0.5rem',
                    fontSize: '1rem'
                }}
            />
        </div>
    );
};

export default SearchBar;