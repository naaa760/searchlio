const BASE_URL = import.meta.env.VITE_SEARCH_API_ENDPOINT;
const API_KEY = import.meta.env.VITE_SEARCH_API_KEY;

export const searchApi = {
  search: async (query) => {
    try {
      console.log("API request:", `${BASE_URL}/search`);
      const response = await fetch(`${BASE_URL}/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({ query }),
      });

      console.log("API response:", response);
      if (!response.ok) throw new Error("Search failed");

      return await response.json();
    } catch (error) {
      console.error("Search API Error:", error);
      throw error;
    }
  },
};
