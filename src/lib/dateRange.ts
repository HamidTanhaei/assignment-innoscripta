type DateRange = {
    fromDate: string;
    toDate: string;
};

export function getDateRange(dateFilter?: string): DateRange | undefined {
    if (!dateFilter) return undefined;

    const today = new Date();
    const formatDate = (date: Date): string => {
        return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
    };

    switch (dateFilter) {
        case 'today': {
            const date = formatDate(today);
            return { fromDate: date, toDate: date };
        }
        case 'yesterday': {
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const date = formatDate(yesterday);
            return { fromDate: date, toDate: date };
        }
        case 'this_week': {
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - today.getDay());
            return {
                fromDate: formatDate(weekStart),
                toDate: formatDate(today)
            };
        }
        case 'this_month': {
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            return {
                fromDate: formatDate(monthStart),
                toDate: formatDate(today)
            };
        }
        default:
            return undefined;
    }
}