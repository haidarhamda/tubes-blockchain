import Web3 from "web3";

let web3: Web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    // Modern dApp browsers
    web3 = new Web3(window.ethereum);

    // Request MetaMask account access if needed
    window.ethereum.request({ method: "eth_requestAccounts" })
        .then((accounts: string[]) => {
            console.log("Connected to MetaMask:", accounts);
        })
        .catch((error: any) => {
            console.error("User denied account access:", error);
        });

    // Ensure the correct network is selected (for your private network)
    window.ethereum.on("chainChanged", (chainId: string) => {
        console.log("Chain changed to:", chainId);
    });
} else {
    // Use a local Ethereum node if MetaMask is not available
    const provider = new Web3.providers.HttpProvider("http://localhost:8545");
    web3 = new Web3(provider);
}

export default web3;
