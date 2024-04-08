const express = require("express");
const router = express.Router();
const axios = require("axios");
const {
  mintNFT,
  createRandomWallet,
  getNFTs,
} = require("../service/NFTService");

//nft 민팅
router.post("/nft", async (req, res) => {
  console.log(req.body);
  // console.log("data : ",  data);
  try {
    const result = await mintNFT(req.body);
    if (result != null) {
      res.send(result);
    } else {
      res.send("error");
    }
  } catch (e) {
    res.send(e);
  }
});

//지갑 만들어주기
router.post("/wallet", (req, res) => {
  try {
    const newWallet = createRandomWallet();
    res.send({
      address: newWallet.address,
      mnemonic: newWallet.mnemonic.phrase,
      privateKey: newWallet.privateKey,
    });
  } catch (error) {
    res.send(error);
  }
});

//NFT 불러오기
router.post("/nfts", async (req, res) => {
  try {
    const nftList = await getNFTs(req.body);

    const promises = nftList.map(
      (element) =>
        new Promise((resolve, reject) => {
          axios
            .get(element[1])
            .then((res) => resolve(res, element))
            .catch((err) => reject(err));
        }),
    );

    let result = [];
    await Promise.allSettled(promises)
      .then((results) => {
        results.forEach((response) => {
          const nft = response.value.data;

          let ipfsUrl = nft.image;
          ipfsUrl = ipfsUrl.split("ipfs://")[1];
          ipfsUrl = "https://ipfs.io/ipfs/" + ipfsUrl;

          const parseResult = {
            name: nft.name,
            description: nft.description,
            image: ipfsUrl,
          };

          console.log(parseResult);
          result.push(parseResult);
        });
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(result);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
  
});

module.exports = router;
