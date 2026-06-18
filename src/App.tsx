import "./App.css";
import HomePage from "./pages/HomePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import FeesFAQPage from "./pages/FeesFAQPage";
import { ContactPage } from "./pages/ContactPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToHash } from "./components/ScrollToHash";

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/fees-and-faq" element={<FeesFAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
