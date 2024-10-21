import React, { useState, useEffect } from "react"
import { Search as SearchIcon, Menu, X, Shield } from "lucide-react"
import { useDebounce } from "@/hooks/useDebounce"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SearchArea() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const debouncedQuery = useDebounce(query, 300)

  const API_KEY = import.meta.env.VITE_SEARCH_API_KEY

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!debouncedQuery) return

      setLoading(true)
      try {
        const response = await fetch(
          `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=74828e4bcad394ff7&q=${debouncedQuery}`
        )
        const data = await response.json()
        setResults(data.items || [])
      } catch (error) {
        console.error("Search API Error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }, [debouncedQuery, API_KEY])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Searching for:", query)
  }

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="overflow-hidden bg-gray-800 border-gray-700">
          <CardHeader className="space-y-2 pb-4">
            <Skeleton className="h-4 w-2/3 bg-gray-700" />
            <Skeleton className="h-3 w-1/2 bg-gray-700" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-16 bg-gray-700" />
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="py-4 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-blue-500" />
              <h1 className="text-2xl font-bold">Searchlio</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </nav>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
          {menuOpen && (
            <nav className="mt-4 md:hidden">
              <a href="#" className="block py-2 text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="#" className="block py-2 text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#" className="block py-2 text-gray-300 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="block py-2 text-gray-300 hover:text-white transition-colors">Contact</a>
            </nav>
          )}
        </div>
      </header>
      <main className="flex-grow flex flex-col">
        <div className="container mx-auto px-4 py-16 flex flex-col flex-grow items-center">
          <div className="max-w-3xl w-full text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Search without{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
                privacy issues
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Experience the power of private, secure, and unbiased search results.
            </p>
            <form onSubmit={handleSubmit} className="relative">
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search privately..."
                className="pl-12 pr-20 py-6 rounded-full text-lg bg-gray-800 border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
              <Button
                type="submit"
                disabled={loading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span className="sr-only">Searching...</span>
                  </div>
                ) : (
                  "Search"
                )}
              </Button>
            </form>
          </div>

          <div className="max-w-3xl w-full space-y-4 flex-grow">
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
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-xl text-gray-400">Enter a search query to get started</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="py-6 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 PrivateSearch. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  )
}