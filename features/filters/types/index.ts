export interface Filters {
    filterType: "JOBS" | "EMAILS"
    status: string;
    searchTerm: string
    isDisabled: boolean;
    handleSearch: (e: any) => void;
    showApplied: () => void;
    showRejected: () => void;
    showInterview: () => void;
    reset: () => void
}