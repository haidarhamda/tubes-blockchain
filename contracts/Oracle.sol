// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Oracle {
    address public oracle;
    mapping(uint256 => uint256) public contentViewers;
    mapping(uint256 => uint256) public lastUpdateTime;

    modifier onlyOracle() {
        require(msg.sender == oracle, "Only oracle can call this");
        _;
    }

    constructor(address _oracle) {
        oracle = _oracle;
    }

    function setContentViewers(uint256 contentId, uint256 viewers) external onlyOracle {
        require(
            block.timestamp >= lastUpdateTime[contentId] + 10 seconds,
            "Updates are allowed only once per 10 seconds"
        );

        contentViewers[contentId] = viewers;

        lastUpdateTime[contentId] = block.timestamp;
    }


    function getContentViewers(uint256 contentId) external view returns (uint256) {
        return contentViewers[contentId];
    }

    function changeOracle(address _newOracle) public {
        oracle = _newOracle;
    }
}
