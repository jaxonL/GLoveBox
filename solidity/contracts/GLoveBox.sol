//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GLoveBox is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address[] participants;
    mapping(address=>TokenMetaData[]) private ownershipRecord;
    // v1: mapping for token -> metadata
    mapping(uint=>string) public tokenIdToMessage;

    struct TokenMetaData {
        uint tokenId;
        uint timeStamp;
        string tokenURI;
        address from;
    }

    constructor() ERC721("GLoveBox","GLB") {
        participants.push(msg.sender);
    }

    modifier callerIsUser() {
        require(tx.origin == msg.sender, "GLoveBox :: Cannot be called by a contract");
        _;
    }

    function sendMessage(string memory message) public returns (uint256) {
        uint newTokenId = _tokenIds.current();
        require(participants.length > 0, "GloveBox :: Empty participant list");
        uint random = uint(keccak256(abi.encodePacked(block.timestamp, message, msg.sender))) % participants.length;
        _safeMint(participants[random], newTokenId);
        ownershipRecord[participants[random]].push(TokenMetaData(newTokenId, block.timestamp, message, msg.sender));
        tokenIdToMessage[newTokenId] = message;
        _tokenIds.increment();
        return newTokenId;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return tokenIdToMessage[tokenId];
    }

    // used with balanceOf to rebuild the received messages
    function getReceivedMessages() public view returns (TokenMetaData[] memory receivedMessages) {
        receivedMessages = ownershipRecord[msg.sender];
        return receivedMessages;
    }

    // registration
    function register() external callerIsUser {
        if (owner() == msg.sender) {
            revert("GLoveBox :: Owner is already registered");
        }
        // check if this address already registered
        for (uint i; i < participants.length; i++) {
            if (participants[i] == msg.sender) {
                revert("GLoveBox :: Already registered");
            }
        }
        participants.push(msg.sender);
    }

    function getParticipants () public view returns (address[] memory) {
        return participants;
    }

    function isRegistered (address participant) public view returns (bool) {
        if (owner() == participant) {
            return true;
        }
        // check if this address already registered
        for (uint i; i < participants.length; i++) {
            if (participants[i] == participant) {
                return true;
            }
        }
        return false;
    }
}
