//package com.ssafy.sos.member.domain;
//
//import org.web3j.crypto.*;
//import org.web3j.utils.Numeric;
//
//public class WalletGenerator {
//
//    // 사용자 정보를 받아 지갑을 생성하는 메서드
//    public static Credentials generateWallet(String password) throws Exception {
//        // 새로운 지갑 생성
//        ECKeyPair ecKeyPair = Keys.createEcKeyPair();
//        WalletFile walletFile = Wallet.createLight(password, ecKeyPair);
//
//        // 생성된 지갑에서 credentials 추출
//        return Credentials.create(Wallet.decrypt(password, walletFile));
//    }
//
//    public static void main(String[] args) {
//        try {
//            // 사용자로부터 비밀번호 입력 받기 (보안에 주의)
//            String password = "your_password";
//
//            // 지갑 생성 및 출력
//            Credentials credentials = generateWallet(password);
//            System.out.println("Address: " + credentials.getAddress());
//            System.out.println("Private Key: " + Numeric.toHexStringWithPrefix(credentials.getEcKeyPair().getPrivateKey()));
//            System.out.println("Public Key: " + Numeric.toHexStringWithPrefix(credentials.getEcKeyPair().getPublicKey()));
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//}
