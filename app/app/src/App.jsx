import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import abi from "./contracts/abi.json";
import RegisterEvidence from "./pages/Create";
import TransferCustody from "./pages/TransferCustody";
import FetchHistory from "./pages/History";
import Navbar from "./components/Navbar";

import RetrieveMetadata from "./pages/RetrieveMetadata";

const CONTRACT_ADDRESS = "0xa36cCb08f076577Fa5794B47f14435c48366B3f2"; // Replace with actual address

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    connectWallet();
  }, []);

  async function connectWallet() {
    if (!window.ethereum) {
      toast.error("Metamask not detected");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();
      setAccount(userAddress);

      const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, abi.abi, signer);
      setContract(contractInstance);
      toast.success(`Connected: ${userAddress}`);
    } catch (error) {
      toast.error("Error connecting wallet!");
      console.error(error);
    }
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <Navbar web3Handler={connectWallet} account={account} />
        <ToastContainer />



        {account ? (
          <>
     

            {/* Routes */}
            <Routes>
              <Route path="/" element={<h2>Welcome to Chain of Custody</h2>} />
              <Route path="/register" element={<RegisterEvidence contract={contract} />} />
              <Route path="/transfer" element={<TransferCustody contract={contract} />} />
              <Route path="/history" element={<RetrieveMetadata contract={contract} />} />
            </Routes>
          </>
        ) : (
          <button onClick={connectWallet} className="bg-blue-500 px-4 py-2 rounded">
            Connect Wallet
          </button>
        )}
      </div>
    </Router>
  );
}

export default App;
