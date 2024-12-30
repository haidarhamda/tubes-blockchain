import web3 from "./web3";
import ContentOwnershipABI from "../../contracts/ContentOwnership.json"; // Adjust path if needed
import { Contract } from "web3-eth-contract";

const contractAddress = "0xa8a908F30550e4F467908f6011D434F3E48e5F85"; // Replace with actual address
const ContentOwnership: Contract = new web3.eth.Contract(
    ContentOwnershipABI.abi as any, // Cast ABI to any if needed
    contractAddress
);

export default ContentOwnership;
