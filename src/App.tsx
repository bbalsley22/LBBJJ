import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { HeroSection } from "./components/HeroSection";
import Auth from "./pages/Auth";
import ManageSubscription from "./pages/ManageSubscription";
import About from "./pages/About";
import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/manage-subscription" element={<ManageSubscription />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;