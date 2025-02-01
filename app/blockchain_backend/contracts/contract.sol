// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ChainOfCustody is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    struct Evidence {
        uint256 id;
        string title;
        string description;
        string imageURI;
        address currentCustodian;
        uint256 timestamp;
        bool exists;
    }

    struct CustodyRecord {
        uint256 evidenceId;
        address fromCustodian;
        address toCustodian;
        uint256 timestamp;
    }

    mapping(uint256 => Evidence) public evidences;
    mapping(uint256 => CustodyRecord[]) public custodyHistory;

    address public admin;
    uint256 private evidenceCounter;

    event EvidenceRegistered(uint256 indexed evidenceId, string title, string description, string imageURI, address indexed custodian, uint256 timestamp);
    event CustodyTransferred(uint256 indexed evidenceId, address indexed fromCustodian, address indexed toCustodian, uint256 timestamp);

    modifier onlyAdmin() {
        require(msg.sender == admin, "only admin can perform this option");
        _;
    }

    modifier onlyCustodian(uint256 evidenceId) {
        require(evidences[evidenceId].currentCustodian == msg.sender, "only the current custodian can call this");
        _;
    }

    constructor() ERC721("ChainOfCustodyToken", "COC") {
        admin = msg.sender;
        evidenceCounter = 0;
    }

    function registerEvidence(string memory _title, string memory _description, string memory _imageURI) public onlyAdmin {
        evidenceCounter++;
        uint256 tokenId = _tokenIdCounter.current();

        // Mint an ERC721 token for the evidence
        _mint(msg.sender, tokenId);
        _tokenIdCounter.increment();

        evidences[tokenId] = Evidence({
            id: tokenId,
            title: _title,
            description: _description,
            imageURI: _imageURI,
            currentCustodian: msg.sender,
            timestamp: block.timestamp,
            exists: true
        });

        emit EvidenceRegistered(tokenId, _title, _description, _imageURI, msg.sender, block.timestamp);
    }

    function transferCustody(uint256 _evidenceId, address _newCustodian) public onlyCustodian(_evidenceId) {
        require(evidences[_evidenceId].exists, "evidence does not exist");

        CustodyRecord memory newRecord = CustodyRecord({
            evidenceId: _evidenceId,
            fromCustodian: msg.sender,
            toCustodian: _newCustodian,
            timestamp: block.timestamp
        });

        custodyHistory[_evidenceId].push(newRecord);
        evidences[_evidenceId].currentCustodian = _newCustodian;

        emit CustodyTransferred(_evidenceId, msg.sender, _newCustodian, block.timestamp);
    }

    function getCustodyHistory(uint256 _evidenceId) public view returns (CustodyRecord[] memory) {
        return custodyHistory[_evidenceId];
    }

    function getCurrentCustodian(uint256 _evidenceId) public view returns (address) {
        return evidences[_evidenceId].currentCustodian;
    }

    // Optional function to get the metadata of the evidence (including title, description, and image)
    function getEvidenceMetadata(uint256 _evidenceId) public view returns (string memory, string memory, string memory) {
        require(evidences[_evidenceId].exists, "Evidence does not exist");
        Evidence memory evidence = evidences[_evidenceId];
        return (evidence.title, evidence.description, evidence.imageURI);
    }
}
