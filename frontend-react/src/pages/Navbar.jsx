

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Lock, Shield } from "lucide-react";
import "../styles/Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/view", label: "View Transcript" },
    { path: "/verify", label: "Verify" },
    { path: "/issue", label: "Issue Transcript" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <button onClick={() => navigate("/")} className="logo-button">
            <Shield className="icon" />
            <span>TrustCert</span>
          </button>
        </div>

        <div className="nav-links">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="nav-link">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="menu-button">
          <button onClick={toggleMenu} className="icon-button" aria-label="Toggle menu">
            {isOpen ? <X className="icon" /> : <Menu className="icon" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} onClick={closeMenu} className="mobile-link">
              {link.label}
            </Link>
          ))}
          <button onClick={closeMenu} className="wallet-button">
            <Lock className="icon" />
            <span>Connect Wallet</span>
          </button>
        </div>
      )}
    </nav>
  );
}













































// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Menu, X, Lock, Shield } from "lucide-react";
// import '../styles/Navbar.css'


// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();

//   const toggleMenu = () => setIsOpen(!isOpen);
//   const closeMenu = () => setIsOpen(false);

//   const navLinks = [
//     { path: "/", label: "Home" },
//     { path: "/verify", label: "Verify" },
//     { path: "/issue", label: "Issue Transcript" }
//   ];

//   return (
//     <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex items-center">
//             <button
//               onClick={() => navigate("/")}
//               className="flex items-center space-x-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200"
//             >
//               <Shield className="h-8 w-8" />
//               <span>TrustCert</span>
//             </button>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-50"
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>

//           {/* Desktop Connect Wallet Button */}
//           {/* <div className="hidden md:flex items-center">
//             <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
//               <Lock className="h-4 w-4" />
//               <span>Connect Wallet</span>
//             </button>
//           </div> */}

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button
//               onClick={toggleMenu}
//               className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 transition-colors duration-200"
//               aria-label="Toggle menu"
//             >
//               {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <div className="md:hidden border-t border-gray-200 bg-white">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.path}
//                   to={link.path}
//                   onClick={closeMenu}
//                   className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//               <button
//                 onClick={closeMenu}
//                 className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors duration-200 mt-4"
//               >
//                 <Lock className="h-4 w-4" />
//                 <span>Connect Wallet</span>
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }






































// // src/components/Navbar.js
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Menu, X, Lock } from "lucide-react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();

//   const toggleMenu = () => setIsOpen(!isOpen);

//   return (
//     <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
//         {/* Logo */}
//         <div className="flex items-center space-x-2 text-white font-bold text-xl cursor-pointer" onClick={() => navigate("/")}>
//           <Lock className="w-6 h-6" />
//           <span>TrustCert</span>
//         </div>

//         {/* Desktop Links */}
//         <div className="hidden md:flex items-center space-x-6 text-white text-sm">
//           <Link to="/" className="hover:text-gray-300">Home</Link>
//           <Link to="/verify" className="hover:text-gray-300">Verify</Link>
//           <Link to="/issue" className="hover:text-gray-300">Issue Transcript</Link>
//           <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm text-white font-medium transition">Connect Wallet</button>
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden">
//           <button onClick={toggleMenu} className="text-white">
//             {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden px-4 pb-4 space-y-3 text-white text-sm">
//           <Link to="/" onClick={toggleMenu} className="block hover:text-gray-300">Home</Link>
//           <Link to="/verify" onClick={toggleMenu} className="block hover:text-gray-300">Verify</Link>
//           <Link to="/issue" onClick={toggleMenu} className="block hover:text-gray-300">Issue Certificate</Link>
//           <button className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm text-white font-medium transition">
//             Connect Wallet
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// }
