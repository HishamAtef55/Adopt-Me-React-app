import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Details from "../pages/Details";
import SearchParams from "../pages/SearchParams";
import AdoptPetContext from "../context/AdoptPetContext";
import { useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  // [AdoptedPet,setAdoptedPet]
  const AdoptedPet = useState(null);
  return (
    <BrowserRouter>
      <AdoptPetContext.Provider value={AdoptedPet}>
        <QueryClientProvider client={queryClient}>
          <header>
            <Link to={"/"}>Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/" element={<SearchParams />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AdoptPetContext.Provider>
    </BrowserRouter>
  );
};
const container = document.getElementById("root");

const root = createRoot(container);
root.render(<App />);

export default App;
