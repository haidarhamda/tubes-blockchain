import Web3 from "web3";

let web3: Web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum);

    window.ethereum.request({ method: "eth_requestAccounts" })
        .then((accounts: string[]) => {
            console.log("Connected to MetaMask:", accounts);
        })
        .catch((error: any) => {
            console.error("User denied account access:", error);
        });

    window.ethereum.on("chainChanged", (chainId: string) => {
        console.log("Chain changed to:", chainId);
    });
} else {
    const provider = new Web3.providers.HttpProvider("http://localhost:8545");
    web3 = new Web3(provider);
}

export default web3;
