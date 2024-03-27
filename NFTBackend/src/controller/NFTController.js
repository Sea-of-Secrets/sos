const express = require('express');
const router = express.Router();
const { mintNFT, createRandomWallet } = require('../service/NFTService');

//nft 정보 받기
router.post("/nft", async (req, res) => {
    console.log(req.body);
    // console.log("data : ",  data);
    const result = await mintNFT(req.body);
    if (result != null) {
        res.send(result);
    } else {
        res.send("error");
    }
    
})

//지갑 만들어주기
router.post('/wallet', (req, res) => {
    const newWallet = createRandomWallet();
    res.json({
        address: newWallet.address,
        mnemonic: newWallet.mnemonic.phrase,
        privateKey: newWallet.privateKey
    });
});

module.exports = router