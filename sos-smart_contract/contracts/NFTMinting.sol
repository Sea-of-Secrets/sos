// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SOSTOKEN is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    uint256 private _tokenIds;

    struct NFTData {
        address publisher;
        string ipfsHash;
        string description;
    }

    mapping(uint256 => NFTData) private _nftData;

    constructor(address deployer) ERC721("SOSToken", "STK") Ownable(deployer) {
        _tokenIds = 0;
    }

    function mintNFT(address recipient, string memory ipfsHash, string memory description) public returns (uint256) {
        _tokenIds++;
        uint256 newItemId = _tokenIds;
        
        _mint(recipient, newItemId);

        NFTData storage data = _nftData[newItemId];
        data.publisher = msg.sender;
        data.ipfsHash = ipfsHash;
        data.description = description;

        _setTokenURI(newItemId, ipfsHash);
        return newItemId;
    }


    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
