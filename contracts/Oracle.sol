// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Oracle {
    address public oracle;
    mapping(uint256 => uint256) public contentViewers;
    mapping(uint256 => uint256) public lastContentViewers;
    mapping(uint256 => uint256) public lastUpdateTime;

    event OracleChanged(address _newOracle);
    event ContentSet(uint256 contentId, uint256 viewers);

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
        lastContentViewers[contentId] = 0;

        lastUpdateTime[contentId] = block.timestamp;

        emit ContentSet(contentId, viewers);
    }


    function getContentViewers(uint256 contentId) public  returns (uint256) {
        uint256 viewers = contentViewers[contentId] - lastContentViewers[contentId];

        lastContentViewers[contentId] = contentViewers[contentId];

        return viewers;
    }

    function changeOracle(address _newOracle) external onlyOracle {
        oracle = _newOracle;

        emit OracleChanged(_newOracle);
    }

}
