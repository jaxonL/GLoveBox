//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract GloveBox is ERC721{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    constructor(){
        ERC721(_name,_symbol);
    }
    function mintToken(address _to, string memory tokenURI) returns (uint256){
        unint newTokenId = _tokenIds.current();
        mint(_to,newTokenId);
        _setTokenUri(newTokenId,tokenURI);
        _tokenIds.increment();
        return newTokenId;
    }
    function send(address _to, string memory tokenURI){
        mintToken(_to, tokenURI);
    }
}