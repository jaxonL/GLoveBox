//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GloveBox is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address[] participants;
    mapping(address=>TokenMetaData[]) public ownershipRecord;
    // mapping for token -> metadata
    mapping(uint=>string) public tokenIdToMessage;

    struct TokenMetaData {
        uint tokenId;
        uint timeStamp;
        string tokenURI;
    }

    constructor() ERC721("GLoveBoxMessage","GLB") {}

    modifier callerIsUser() {
        require(tx.origin == msg.sender, "GLoveBoxMessage :: Cannot be called by a contract");
        _;
    }

    function sendMessage(string memory message) public returns (uint256) {
        uint newTokenId = _tokenIds.current();
        uint random = uint(keccak256(abi.encodePacked(block.timestamp, message, msg.sender))) % participants.length;
        _safeMint(participants[random], newTokenId);
        ownershipRecord[participants[random]].push(TokenMetaData(newTokenId, block.timestamp, message));
        tokenIdToMessage[newTokenId] = message;
        _tokenIds.increment();
        return newTokenId;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return tokenIdToMessage[tokenId];
    }

    // used with balanceOf to rebuild the received messages
    function getMessageData(uint index) public view returns (uint, uint, string memory) {
        require(index < ownershipRecord[msg.sender].length, "GetMessageData: query for nonexistent index");
        TokenMetaData storage metadata = ownershipRecord[msg.sender][index];
        return (metadata.tokenId, metadata.timeStamp, metadata.tokenURI);
    }

    // registration
    function register() external callerIsUser {
        // check if this address already registered
        for (uint i; i < participants.length; i++) {
            if (participants[i] == msg.sender) {
                revert("Already registered");
            }
        }
        participants.push(msg.sender);
    }

    function getParticipants () public view returns (address[] memory) {
        return participants;
    }

    function isRegistered (address participant) public view returns (bool) {
        // check if this address already registered
        for (uint i; i < participants.length; i++) {
            if (participants[i] == participant) {
                return true;
            }
        }
        return false;
    }
}
