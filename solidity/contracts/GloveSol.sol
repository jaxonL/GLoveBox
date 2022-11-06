//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract GloveBox is ERC721{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    // Optional mapping for token URIs
    mapping (uint256 => string) private _tokenURIs;
    constructor() ERC721("Love Message","GLB") {}

    function mintToken(address _to, string memory tokenURI) public returns (uint256){
        uint newTokenId = _tokenIds.current();
        _mint(_to,newTokenId);
        _setTokenURI(newTokenId,tokenURI);
        _tokenIds.increment();
        return newTokenId;
    }
    function send(address _to, string memory tokenURI) public{
        mintToken(_to, tokenURI);
    }
      function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }
}