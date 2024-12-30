import web3 from "./web3";
import ContentOwnershipABI from "../../contracts/ContentOwnership.json"; // Adjust path if needed
import { Contract } from "web3-eth-contract";

const contractAddress = "0xF589160b276BaC6Eac7edf1a712965fff7aEe396"; // Replace with actual address
const ContentOwnership: Contract = new web3.eth.Contract(
    ContentOwnershipABI.abi as any, // Cast ABI to any if needed
    contractAddress
);

export default ContentOwnership;
