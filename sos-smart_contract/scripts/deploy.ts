import { ethers } from 'hardhat';
import fs from 'fs';

async function main() {
  const SOSTOKEN = await ethers.getContractFactory('SOSTOKEN');
  const contract = await SOSTOKEN.deploy("0x3D27CBFB5a5290A97Bdd16a58588B4bBf4543052");
  await contract.deployed();
  console.log('배포된 컨트랙트의 주소 : ', contract.address);

  // 배포된 컨트랙트 주소와 ABI를 파일에 저장
  fs.writeFileSync('deployedContractAddress.txt', contract.address);
  fs.writeFileSync('deployedContractABI.json', JSON.stringify(contract.interface, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});