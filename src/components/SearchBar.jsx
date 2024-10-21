import React, { useState } from "react";

import { Search as SearchIcon } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const { search, loading } = useSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", query);
    search(query);
  };

  console.log("Loading:", loading);

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="flex gap-2">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search privately..."
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Searching..." : <SearchIcon className="h-4 w-4" />}
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
