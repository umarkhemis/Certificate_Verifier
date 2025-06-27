
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Award,
  CheckCircle,
  ExternalLink,
  Users,
  Lock,
} from "lucide-react";
import "../styles/LandingPage.css";
import ConnectWallet from "./ConnectWallet";

// const schoolWallets = ["0x39E8b7AC7b10558b7feA757398109f2116475D68"];
const schoolWallets = ["0x39E8b7AC7b10558b7feA757398109f2116475D68"];

export default function LandingPage() {
  const [wallet, setWallet] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);
  const navigate = useNavigate();

  const handleWalletConnect = (address) => {
    setWallet(address);
    setShowDashboard(false); // Reset dashboard on new wallet connect
  };

  const goToDashboard = () => {
    setShowDashboard(true);
  };

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Immutable",
      description:
        "Certificates stored on blockchain cannot be tampered with or falsified",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Instant Verification",
      description:
        "Verify any certificate instantly without contacting institutions",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Multi-Institution",
      description:
        "Support for multiple educational institutions and organizations",
    },
  ];

  const isSchool = schoolWallets.includes(wallet);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="p-6">
          <nav className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center space-x-2">
              <Lock className="w-8 h-8 text-white" />
              <span className="text-2xl font-bold text-white">TrustCert</span>
            </div>
            <button
              onClick={() => navigate("/verify")}
              className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors"
            >
              <span>Verify Certificate</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Hero Section */}
            <div className="mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                TrustCert
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  {" "}
                  System
                </span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
                Secure, verifiable, and tamper-proof digital certificates
                powered by blockchain technology. Issue, manage, and verify
                educational credentials with complete transparency.
              </p>
            </div>

            {/* Features Section */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="text-white mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Wallet Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl max-w-md mx-auto">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Get Started
              </h2>

              <ConnectWallet onConnected={handleWalletConnect} />

              {wallet && (
                <div className="mt-6 space-y-4">
                  <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                    <p className="text-sm text-gray-300 mb-2">
                      Connected Wallet:
                    </p>
                    <p className="font-mono text-xs text-white break-all bg-black/20 p-2 rounded">
                      {wallet}
                    </p>
                  </div>

                  <div className="flex items-center justify-center space-x-2 text-green-400 mb-4">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm">Wallet Connected Successfully</span>
                  </div>

                  <button
                    onClick={goToDashboard}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Access Dashboard
                  </button>

                  {showDashboard && (
                    <div className="mt-8 bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
                      <h3 className="text-xl font-semibold text-white mb-4">
                        Dashboard Features
                      </h3>
                      <div className="grid gap-4">
                        {isSchool && (
                          <button
                            onClick={() => navigate("/issue")}
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-xl"
                          >
                            Issue Certificate
                          </button>
                        )}
                        <button
                          onClick={() => navigate("/view")}
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-xl"
                        >
                          View Certificate
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Call to Action */}
            <div className="mt-12">
              <p className="text-gray-300 mb-4">
                Don't have a certificate to verify?
              </p>
              <button
                onClick={() => navigate("/verify")}
                className="inline-flex items-center space-x-2 text-white hover:text-gray-200 underline underline-offset-4 transition-colors"
              >
                <span>Try our certificate verification tool</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-black/20 backdrop-blur-lg border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <Lock className="w-6 h-6 text-white" />
                  <span className="text-xl font-bold text-white">
                    TrustCert
                  </span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Revolutionizing digital credentials with blockchain
                  technology. Secure, verifiable, and globally accessible
                  certificate management.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-3">Platform</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Issue Certificates
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Verify Credentials
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Student Portal
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-3">Support</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 CertChain. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Security
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}






































