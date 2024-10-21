import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Search from "./components/Search";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </>
  );
}

export default App;