import Footer from "./Footer";
import Header from "./Header";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

const Search = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SearchBar />
        {/* <SearchResults /> */}
      </main>
      <Footer />
    </>
  );
};

export default Search;
