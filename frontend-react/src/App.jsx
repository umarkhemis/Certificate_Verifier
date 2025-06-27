

// import { useEffect, useState } from "react";
// import { ethers } from "ethers";
// import { CONTRACT_ADDRESS } from "./config";
// // import abi from "./abi/CertificateRegistryABI";
// import { CertificateRegistryABI } from "./abi/CertificateRegistryABI";
// import IssueCertificate from "./components/IssueCertificate";
// import ViewCertificate from "./components/ViewCertificate";
// import VerifyCertificate from "./components/VerifyCertificate";

// function App() {
//   const [account, setAccount] = useState(null);
//   const [contract, setContract] = useState(null);
//   const [isSchool, setIsSchool] = useState(false);

//   useEffect(() => {
//     const init = async () => {
//       if (window.ethereum) {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         const signer = await provider.getSigner();
//         const addr = await signer.getAddress();

//         const certContract = new ethers.Contract(
//           CONTRACT_ADDRESS,
//           abi.abi,
//           signer
//         );

//         const schoolStatus = await certContract.isRegisteredSchool(addr);

//         setAccount(addr);
//         setIsSchool(schoolStatus);
//         setContract(certContract);
//       } else {
//         alert("Please install MetaMask");
//       }
//     };
//     init();
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Blockchain Certificate DApp</h1>
//       <p>Connected as: {account}</p>

//       {contract && isSchool && <IssueCertificate contract={contract} />}
//       <ViewCertificate contract={contract} />
//       <VerifyCertificate contract={contract} />
//     </div>
//   );
// }

// export default App;

























// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
// import IssueCertificate from "./pages/IssueCertificate";
// import ImprovedIssueCertificate fro./pages/ImprovedIssueCertificateate";
import ImprovedIssueCertificate from "./pages/ImprovedIssueCertificate";
import ViewCertificate from "./pages/ViewCertificate";
import VerifyCertificate from "./pages/VerifyCertificate";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/issue" element={<ImprovedIssueCertificate />} />
        <Route path="/view" element={<ViewCertificate />} />
        <Route path="/verify" element={<VerifyCertificate />} />
      </Routes>
    </Router>
  );
}

export default App;
