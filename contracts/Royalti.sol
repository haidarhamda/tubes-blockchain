// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Oracle.sol";

contract ContentOwnership {
    mapping(uint256 => address payable) public contentToOwner;
    mapping(uint256 => uint256) public lastContentViewers;
    address public publisher;
    Oracle oracle;

    event RoyaltyRequested(uint256 contentId, address owner, uint256 amount);
    event ContentAdded(uint256 contentId, address owner);
    event RoyaltyPaid(uint256 contentId, address owner, uint256 amount);

    constructor(address _publisher) {
        publisher = _publisher;
//        oracle = Oracle(payable(_oracleAddress));
    }

    modifier onlyContentOwner(uint256 contentId) {
        require(contentToOwner[contentId] == msg.sender, "You are not the owner of this content ID");
        _;
    }

    modifier onlyPublisher() {
        require(msg.sender == publisher, "Only the publisher can execute this");
        _;
    }

    function setOracle(address _oracle) public onlyPublisher {
        oracle=Oracle(_oracle);
    }

    function addContent(uint256 contentId) public {
        require(contentToOwner[contentId] == address(0), "Content ID already owned by someone");

        address payable owner = payable(msg.sender);
        contentToOwner[contentId] = owner;
        lastContentViewers[contentId] = 0;

        emit ContentAdded(contentId, owner);
    }

    function getRoyalty(uint256 contentId) public onlyContentOwner(contentId) {
        address payable owner = contentToOwner[contentId];

        require(owner != address(0), "Owner address is invalid");
        require(address(this).balance > 0, "Smart contract does not have enough funds");

        uint256 viewCount = oracle.getContentViewers(contentId);
        uint256 delta = viewCount-lastContentViewers[contentId];
        uint256 royaltyAmount =  delta * 0.000001 ether;

        require(address(this).balance >= royaltyAmount, "Insufficient balance in smart contract");

        lastContentViewers[contentId] = viewCount;

        (bool success, ) = owner.call{value: royaltyAmount}("");
        require(success, "Royalty payment failed");

        emit RoyaltyPaid(contentId, owner, royaltyAmount);
    }

    receive() external payable {}
}

