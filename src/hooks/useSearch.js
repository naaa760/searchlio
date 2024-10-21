import { useState } from "react";
import { searchApi } from "../services/searchApi";
import { nlpService } from "../services/nlpService";

export function useSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState({
    totalResults: 0,
    searchTime: 0,
    averagePrivacyScore: 0,
  });

  const search = async (query) => {
    try {
      setLoading(true);
      setError(null);
      
      const startTime = performance.now();
      const processedQuery = nlpService.processQuery(query);
      const searchResults = await searchApi.search(processedQuery);
      console.log("Search results:", searchResults);
      console.log("Searching for:", query);

      const endTime = performance.now();
      const searchTime = ((endTime - startTime) / 1000).toFixed(2);

      const averagePrivacyScore =
        searchResults.reduce((acc, result) => acc + result.privacyScore, 0) /
        searchResults.length;

      // Update state
      setResults(searchResults);
      setMetrics({
        totalResults: searchResults.length,
        searchTime: parseFloat(searchTime),
        averagePrivacyScore: Math.round(averagePrivacyScore),
      });
    } catch (err) {
      setError(err.message);
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    results,
    loading,
    error,
    metrics,
    search,
  };
}
