package com.ssafy.sos.user.service;

import com.ssafy.sos.nft.domain.Wallet;
import com.ssafy.sos.nft.repository.WalletRepository;
import com.ssafy.sos.product.domain.Product;
import com.ssafy.sos.product.domain.Purchase;
import com.ssafy.sos.product.repository.ProductRepository;
import com.ssafy.sos.product.repository.PurchaseRepository;
import com.ssafy.sos.user.domain.CustomOAuth2User;
import com.ssafy.sos.user.domain.TodayVisited;
import com.ssafy.sos.user.domain.UserEntity;
import com.ssafy.sos.user.repository.TodayVisitedRepository;
import com.ssafy.sos.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final PurchaseRepository purchaseRepository;
    private final TodayVisitedRepository todayVisitedRepository;
    private final WalletRepository walletRepository;

    public boolean checkAttendance(Long userId) {
        // 이미 오늘 방문했으면
        if (todayVisitedRepository.existsById("TodayVisited:" + userId)) {
            return false;
            // 오늘 방문한 적이 없으면
        } else {
            TodayVisited todayVisited = TodayVisited.builder()
                    .id(userId)
                    .visitedTime(LocalDateTime.now())
                    .build();

            todayVisitedRepository.save(todayVisited);
            return true;
        }
    }



    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul")
    public void cleanTodayVisited() {
        log.info("redis today visited clean!");
        todayVisitedRepository.deleteAll();
    }

    public UserEntity getUserInfo(CustomOAuth2User user) {
        UserEntity userEntity = userRepository.findByUsername(user.getUserDto().getUsername());
        if (userEntity == null) {
            System.out.println("지갑 없음");
            return null;
        }
        return userEntity;
    }

    public List<Product> findPurchasesByUser(UserEntity user) {
        List<Purchase> byUserId = purchaseRepository.findByUserId(user);

        // Purchase 리스트에서 Product 리스트를 추출
        List<Product> products = byUserId.stream() // byUserId는 Purchase 객체의 리스트
                .map(Purchase::getProduct) // 각 Purchase 객체에서 Product 객체를 추출
                .distinct() // 중복된 Product 객체를 제거
                .collect(Collectors.toList()); // 결과를 List로 수집

        return products;
    }

    @Transactional
    public boolean choicePiece(UserEntity user, String productName) {
        List<Product> purchasesByUser = findPurchasesByUser(user);

        boolean flag = false;
        for (Product p : purchasesByUser) {
            if (p.getName().equals(productName)) {
                flag = true;
            }
        }

        if (flag) {
            user.setProductName(productName);
            return true;
        }

        return false;
    }

    public Product getMyDefaultPiece(UserEntity user) {
        Optional<Product> byId = productRepository.findByName(user.getProductName());
        return byId.get();
    }

    @Transactional
    public String updateWallet(UserEntity user, String address) {
        //user에 변경 사항 저장
        user.setWalletAddress(address);
        
        //지갑 테이블에 저장
        Wallet wallet = new Wallet();
        wallet.setAddress(address);
        Wallet save = walletRepository.save(wallet);
        return save.getAddress();
    }

    @Transactional
    public void updateUserName(UserEntity user, String name) {
        user.setName(name);
    }
}
