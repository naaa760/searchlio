import React, { useState, useEffect } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  const API_KEY = import.meta.env.VITE_SEARCH_API_KEY;

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!debouncedQuery) return;

      setLoading(true);
      try {
        const response = await fetch(
          `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=74828e4bcad394ff7&q=${query}`
        );
        const data = await response.json();
        setResults(data.items);
      } catch (error) {
        console.error("Search API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [debouncedQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", query);
  };

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader className="space-y-2 pb-4">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-16" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 py-8 rounded-xl">
      <div className="max-w-5xl mx-auto px-4">
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-2">
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search privately..."
              className="bg-gray-800 border-gray-700 text-white"
            />
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span className="sr-only">Searching...</span>
                </div>
              ) : (
                <SearchIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>

        <div className="space-y-4">
          {loading ? (
            <LoadingSkeleton />
          ) : results && results.length > 0 ? (
            <div className="space-y-4">
              {results.map((result, index) => (
                <a
                  key={index}
                  href={result.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-transform hover:-translate-y-1"
                >
                  <Card className="bg-gray-800 border-gray-700 hover:border-blue-500">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-blue-400 hover:text-blue-300">
                        {result.title}
                      </CardTitle>
                      <p className="text-sm text-gray-400">{result.link}</p>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-300">
                        {result.snippet}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          ) : query && !loading ? (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8 text-center">
                <p className="text-gray-400">No results found for "{query}"</p>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}
