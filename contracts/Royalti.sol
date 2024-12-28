// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Oracle.sol";

contract ContentOwnership {
    mapping(uint256 => address payable) public contentToOwner;
    address payable public predefinedWallet;
    address public publisher;
    Oracle oracle;

    event RoyaltyPaid(uint256 contentId, address owner, uint256 amount);
    event PredefinedWalletUpdated(address payable newWallet);

    constructor(address _publisher, address _oracleAddress) {
        publisher = _publisher;
        oracle = Oracle(_oracleAddress);
    }

    modifier onlyContentOwner(uint256 contentId) {
        require(contentToOwner[contentId] == msg.sender, "You are not the owner of this content ID");
        _;
    }

    modifier onlyPublisher() {
        require(msg.sender == publisher, "Only the publisher can execute this");
        _;
    }

    function setPredefinedWallet(address payable newWallet) public onlyPublisher {
        predefinedWallet = newWallet;
        emit PredefinedWalletUpdated(newWallet);
    }

    function addContent(uint256 contentId) public {
        require(contentToOwner[contentId] == address(0), "Content ID already owned by someone");

        address payable owner = payable(msg.sender);
        contentToOwner[contentId] = owner;
    }

    function getRoyalty(uint256 contentId) public onlyContentOwner(contentId) {
        address payable owner = contentToOwner[contentId];

        require(owner != address(0), "Owner address is invalid");
        require(predefinedWallet.balance > 0, "Predefined wallet does not have enough funds");

        uint256 viewCount = oracle.getContentViewers(contentId);
        uint256 royaltyAmount =  viewCount * 0.00001 ether;  

        require(predefinedWallet.balance >= royaltyAmount, "Insufficient balance in predefined wallet");

        (bool success, ) = predefinedWallet.call{value: royaltyAmount}("");
        require(success, "Royalty payment failed");

        emit RoyaltyPaid(contentId, owner, royaltyAmount);
    }
}

