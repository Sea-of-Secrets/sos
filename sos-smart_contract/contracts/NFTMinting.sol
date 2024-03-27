// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract SOSTOKEN is ERC721, ERC721URIStorage, ERC721Enumerable, ERC721Burnable, Ownable {
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
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }


    function getAllNFTs(address walletAddress) public view returns (NFTData[] memory) {
        NFTData[] memory ownedNFTs = new NFTData[](_tokenIds);
        uint256 ownedNFTsCount = 0;

        for (uint256 i = 1; i <= _tokenIds; i++) {
            if (_ownerOf(i) == walletAddress) {
                ownedNFTs[ownedNFTsCount] = NFTData( {
                    publisher: _nftData[i].publisher,
                    ipfsHash: _nftData[i].ipfsHash,
                    description: _nftData[i].description
                });
                ownedNFTsCount++;
            }
        }

        NFTData[] memory result = new NFTData[](ownedNFTsCount);
        for (uint256 i = 0; i < ownedNFTsCount; i++) {
            result[i] = ownedNFTs[i];
        }

        return result;
    }
}
