

// src/components/ConnectWallet.js
import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function ConnectWallet({ onConnected }) {
  const [wallet, setWallet] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed");
      return;
    }
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWallet(accounts[0]);
      onConnected(accounts[0]);
    } catch (err) {
      console.error("Connection error:", err);
    }
  };

  return (
    <button
      onClick={connectWallet}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      {wallet ? `Connected: ${wallet.slice(0, 6)}...${wallet.slice(-4)}` : "Connect Wallet"}
    </button>
  );
}
