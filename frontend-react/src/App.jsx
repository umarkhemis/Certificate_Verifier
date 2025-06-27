






// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
// import IssueCertificate from "./pages/IssueCertificate";
// import ImprovedIssueCertificate fro./pages/ImprovedIssueCertificateate";
import ImprovedIssueCertificate from "./pages/ImprovedIssueCertificate";
import ViewCertificate from "./pages/ViewCertificate";
import VerifyCertificate from "./pages/VerifyCertificate";
import Navbar from './pages/Navbar'

function App() {
  return (
    <>
    
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/issue" element={<ImprovedIssueCertificate />} />
        <Route path="/view" element={<ViewCertificate />} />
        <Route path="/verify" element={<VerifyCertificate />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
