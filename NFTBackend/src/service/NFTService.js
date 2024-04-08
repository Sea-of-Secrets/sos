const ethers = require('ethers');

const { contract } = require('../ContractConfig');
const BLOCKSDK = require('blocksdk-js')
const client = new BLOCKSDK("Node_RPC_TOKEN");

const {NFTStorage, File} = require('nft.storage');
const fs = require('fs');
const path = require('path');

async function mintNFT(data) {
    try {
        const nftstorage = new NFTStorage({token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEExQTQzM2ZEOGJDRjIwMzlEQmI1NzI4QkU4ZTlBRDRkODA2MkNkNTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcxMTM0MjM0ODU2NiwibmFtZSI6IlNPUyJ9.bHBDVUW3f77JLlFZshIYzcZ72W70K0L3Nu68K9gwlmo"})
        const buffer = Buffer.from(data.file, "base64");
        const image = new File([buffer], "image.png");

        const result = await nftstorage.store({
            image : image,
            name : data.title,
            description : data.description
        })

        const uri = `https://${result.ipnft}.ipfs.nftstorage.link/metadata.json`;
        console.log(result);

    
        // 스마트 컨트랙트의 mintNFT 함수 호출
        const receipt = await contract.mintNFT(data.walletAddress, uri, data.description);
        console.log('NFT minted successfully:', receipt);
        return receipt;
    } catch (error) {
        console.error('Error minting NFT:', error);
        return error;
    }
}


// 무작위 지갑 생성
function createRandomWallet() {
    try {
        const wallet = ethers.Wallet.createRandom();
        return wallet;
    } catch (error) {
        console.error('Error making Wallet', error);
        return error;
    }
}

//지갑 nft 조회
async function getNFTs(dto) {
    try {
        const walletAddress = dto.walletAddress;
        const result = await contract.getAllNFTs(walletAddress);
    
        return result;
    } catch (error) {
        console.error('Error get NFT list');
        return error;
    }
    
}

module.exports = { mintNFT, createRandomWallet, getNFTs };