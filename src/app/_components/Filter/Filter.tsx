'use client';

import { FormSelect } from "@/components/atom";
import SearchBar from "./SearchBar";
import { Button } from "@/components/atom";
import { useFilter } from "./Filter.hooks";
import { dates, sources, categories } from "./Filter.consts";



interface FilterProps {
    params?: {
        q?: string;
        category?: string;
        date?: string;
        source?: string;
    }
}

export const Filter = ({ params = {} }: FilterProps) => {
    
    const {
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
    } = useFilter(params);

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
            <SearchBar 
                onSearch={handleSearch}
                value={filters.q} 
            />
            <FormSelect 
                options={categories}
                defaultOption="Category"
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            />
            <FormSelect 
                options={dates}
                defaultOption="Date"
                value={filters.date}
                onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
            />
            <FormSelect 
                options={sources}
                defaultOption="Source"
                value={filters.source}
                onChange={(e) => setFilters(prev => ({ ...prev, source: e.target.value }))}
            />
            <div className="flex gap-2">
                {isNavigating ? <Button className="grow cursor-wait" variant="secondary">Loading</Button> : (
                    <>
                        {isFormDirty && <Button type="submit" className="grow">Apply Filters</Button>}
                        {hasFilters && !isFiltersSaved && (
                            <Button 
                                type="button"
                                onClick={handleSaveFilters}
                                title="Save as my feed"
                            >
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
                                    <path d="M13 20a1 1 0 0 1-.64-.231L7 15.3l-5.36 4.469A1 1 0 0 1 0 19V2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v17a1 1 0 0 1-1 1Z"/>
                                </svg>
                            </Button>
                        )}
                        {showMyFeedButton && (
                            <Button 
                                type="button"
                                onClick={handleShowFeed}
                                className="grow"
                            >
                                My Feed
                            </Button>
                        )}
                    </>)}
            </div>
            
        </form>
    );
};