import React, { ChangeEvent } from 'react';

interface FilterPanelProps {
    selectedSource: string;
    onSelectSource: (source: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ selectedSource, onSelectSource }) => {
    const handleSourceChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onSelectSource(e.target.value);
    };

    return (
        <div style={{ marginBottom: '1rem' }}>
            <select value={selectedSource} onChange={handleSourceChange}>
                <option value="">All Sources</option>
                <option value="NewsAPI">NewsAPI</option>
                <option value="The Guardian">The Guardian</option>
                <option value="BBC News">BBC News</option>
            </select>
        </div>
    );
};

export default FilterPanel;