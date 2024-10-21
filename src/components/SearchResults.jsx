import React from "react";
import { useSearch } from "../hooks/useSearch";
import ResultCard from "./ResultCard";
import SearchMetrics from "./SearchMetrics";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";

const SearchResults = () => {
  const { results, loading, error, metrics } = useSearch();

  // No search performed yet
  if (!loading && !error && results.length === 0) {
    return null;
  }

  // Loading state
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-8">
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <span className="ml-2 text-gray-400">Searching securely...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Search Error</AlertTitle>
          <AlertDescription>
            {error}. Please try again or modify your search terms.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // No results found
  if (results.length === 0) {
    return (
      <div className="max-w-4xl mx-auto mt-8">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Results Found</AlertTitle>
          <AlertDescription>
            We couldn't find any results matching your search. Try different
            keywords or broaden your search.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      {/* Search Metrics */}
      <SearchMetrics
        metrics={{
          totalResults: results.length,
          searchTime: metrics?.searchTime || 0,
          privacyScore: metrics?.averagePrivacyScore || 0,
        }}
      />

      <div className="space-y-4">
        {results.map((result, index) => (
          <div key={result.url}>
            <ResultCard result={result} />
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <p className="text-sm text-gray-400">
          <span className="font-medium">🔒 Privacy Note:</span> All search
          results are filtered through our privacy evaluation system. Results
          with low privacy scores may be filtered out to protect your privacy.
        </p>
      </div>
    </div>
  );
};

export default SearchResults;
