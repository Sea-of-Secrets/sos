const fs = require('fs')
const ethers = require('ethers');
require('dotenv').config();

// 스마트 컨트랙트 ABI 로드
const abi = JSON.parse(fs.readFileSync('deployedContractABI.json', 'utf-8')).fragments;
const contractAddress = process.env.CONTRACT_ADDRESS

// Klaytn 테스트넷에 연결
const provider = new ethers.JsonRpcProvider('https://api.baobab.klaytn.net:8651',);
const pk = process.env.PRIVATE_KEY
const wallet = new ethers.Wallet(pk, provider)

const signer = wallet.connect(provider)

// 스마트 컨트랙트 인스턴스 생성
const contract = new ethers.Contract(contractAddress, abi, signer);

module.exports = {contract}
