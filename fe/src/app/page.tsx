"use client"
import React, { useState, useEffect } from "react";
import web3 from "../utils/web3";
import ContentOwnership from "../utils/ownership";

const Home: React.FC = () => {
  const [account, setAccount] = useState<string>("");
  const [contentId, setContentId] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [networkId, setNetworkId] = useState<number | string>("");

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const accounts: string[] = await web3.eth.getAccounts();
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }

          const chainId: BigInt = await web3.eth.getChainId();
          const chainIdNumber = Number(chainId);
          setNetworkId(chainIdNumber);

          window.ethereum.on("accountsChanged", (accounts: string[]) => {
            setAccount(accounts[0]);
            setStatus("Account switched.");
          });

          window.ethereum.on("chainChanged", (chainId: string) => {
            const chainIdNumber = Number(chainId);
            setNetworkId(chainIdNumber);
            setStatus(`Network switched to ${chainIdNumber}`);
          });
        } catch (err) {
          console.error("Error loading blockchain data:", err);
        }
      }
    };

    loadBlockchainData();
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", () => {});
        window.ethereum.removeListener("chainChanged", () => {});
      }
    };
  }, []);

  const handleConnectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        setAccount("");

        const accounts: string[] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount(accounts[0]);

        const chainId: BigInt = await web3.eth.getChainId();
        const chainIdNumber = Number(chainId); // Convert BigInt to number
        setNetworkId(chainIdNumber);

        if (chainIdNumber !== 1234567) {
          setStatus("Please switch to the correct network (1234567).");
        } else {
          setStatus("Connected to MetaMask on the correct network.");
        }
      } catch (err: any) {
        setStatus("Error connecting to MetaMask.");
        console.error("Error:", err);
      }
    } else {
      setStatus("MetaMask is not installed.");
    }
  };


  const handleLogout = () => {
    setAccount("");
    setNetworkId("");
    setStatus("You have logged out.");
  };

  const addContent = async () => {
    try {
      console.log("aaa");
      console.log(await ContentOwnership.methods);
      setStatus("Adding content...");

      const gas = await ContentOwnership.methods.addContent(contentId).estimateGas({
        from: account,
      })

      console.log("Gas estimate:", gas);
      const gasPrice = await web3.eth.getGasPrice();
      console.log("Gas price:", gasPrice);

      await ContentOwnership.methods.addContent(contentId).send({
        from: account,
        gas:Number(gas),
        gasPrice:Number(gasPrice)
      });



      setStatus(`Content ${contentId} added successfully!`);
    } catch (err: any) {
      setStatus(`Error: ${err.message}`);
      console.error("Error adding content:", err);
    }
  };

  const getRoyalty = async () => {
    try {
      setStatus("Requesting royalty...");
      console.log("aaa");

      const gas = await ContentOwnership.methods.getRoyalty(contentId).estimateGas({
        from: account,
      })
      console.log(gas);
      const gasPrice = await web3.eth.getGasPrice();
      console.log(gasPrice);

      await ContentOwnership.methods.getRoyalty(contentId).send({
        from: account,
        gas: Number(gas),
        gasPrice: Number(gasPrice),
      });

      setStatus(`Royalty for content ${contentId} requested successfully!`);
    } catch (err: any) {
      setStatus(`Error: ${err.message}`);
      console.error("Error requesting royalty:", err);
    }
  };

  return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Content Ownership Client</h1>
        {!account ? (
            <button
                className="bg-blue-500 text-white px-4 py-2 mb-4"
                onClick={handleConnectWallet}
            >
              Connect Wallet
            </button>
        ) : (
            <div>
              <p className="mb-4">Connected as: {account}</p>
              <p>Network ID: {networkId}</p>
            </div>
        )}
        {networkId !== 1234567 && (
            <p className="text-red-500">Please switch to the correct network (ID: 1234567)</p>
        )}
        {account && (
            <button
                className="bg-red-500 text-white px-4 py-2 mt-4"
                onClick={handleLogout}
            >
              Logout
            </button>
        )}
        <div className="mb-4">
          <label className="block mb-2">Content ID:</label>
          <input
              type="text"
              className="border p-2 w-full text-black"
              value={contentId}
              onChange={(e) => setContentId(e.target.value)}
          />
        </div>
        <button
            className="bg-blue-500 text-white px-4 py-2 mr-2"
            onClick={addContent}
        >
          Add Content
        </button>
        <button
            className="bg-green-500 text-white px-4 py-2"
            onClick={getRoyalty}
        >
          Request Royalty
        </button>
        <div className="mt-4">{status && <p>{status}</p>}</div>
      </div>
  );
};

export default Home;
