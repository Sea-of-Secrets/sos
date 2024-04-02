package com.ssafy.sos.user.controller;

import com.ssafy.sos.game.domain.record.GameRecord;
import com.ssafy.sos.game.domain.record.GameRecordMember;
import com.ssafy.sos.game.repository.GameMemberRepository;
import com.ssafy.sos.product.domain.Product;
import com.ssafy.sos.product.domain.Purchase;
import com.ssafy.sos.product.domain.PurchaseId;
import com.ssafy.sos.user.domain.CustomOAuth2User;
import com.ssafy.sos.user.domain.UserEntity;
import com.ssafy.sos.user.domain.UserNicknameRequest;
import com.ssafy.sos.user.repository.UserRepository;
import com.ssafy.sos.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;
    private final GameMemberRepository gameMemberRepository;

    @GetMapping
    public ResponseEntity<?> getUserInfo(Authentication authentication) {
        CustomOAuth2User user = (CustomOAuth2User) authentication.getPrincipal();

        UserEntity userInfo = userService.getUserInfo(user);
        if (userInfo != null) {
            return ResponseEntity.ok(userInfo);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("없음. 뭐지?");
    }

    @GetMapping("/name")
    public ResponseEntity<Boolean> duplicateUsername(@RequestParam String name) {
        boolean result = userRepository.findByUsername(name) != null;
        return ResponseEntity.ok(result);
    }

    @PatchMapping("/name")
    public ResponseEntity<String> updateUserName(Authentication authentication, @RequestParam String name) {
        CustomOAuth2User user = (CustomOAuth2User) authentication.getPrincipal();
        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("권한 없음");
        }

        UserEntity userInfo = userService.getUserInfo(user);
        userService.updateUserName(userInfo, name);

        return ResponseEntity.ok("success");
    }

    @GetMapping("/records")
    public ResponseEntity<?> getGameRecords(@RequestParam String nickname,
                                                           Authentication authentication) {
        List<GameRecord> gameRecords = null;
        CustomOAuth2User principal = (CustomOAuth2User) authentication.getPrincipal();
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("회원이 아닙니다.");
        }

        Optional<GameRecordMember> gameRecordMember = gameMemberRepository.findByUsername(nickname);
        if (gameRecordMember.isPresent()) {
            gameRecords = gameRecordMember.get().getGameRecords();
        }


        return ResponseEntity.ok(gameRecords);
    }

    @GetMapping("/piece")
    public ResponseEntity<?> getMyDefaultPiece(Authentication authentication) {
        CustomOAuth2User user = (CustomOAuth2User) authentication.getPrincipal();

        UserEntity userInfo = userService.getUserInfo(user);
        Product myDefaultPiece = userService.getMyDefaultPiece(userInfo);

        return ResponseEntity.ok(myDefaultPiece);
    }

    @GetMapping("/pieces")
    public ResponseEntity<?> getPiecesList(Authentication authentication) {
        CustomOAuth2User user = (CustomOAuth2User) authentication.getPrincipal();

        UserEntity userInfo = userService.getUserInfo(user);
        List<Product> purchasesByUser = userService.findPurchasesByUser(userInfo);

        return ResponseEntity.ok(purchasesByUser);
    }

    @PostMapping("/piece")
    public ResponseEntity<?> choicePiece(Authentication authentication, @RequestBody Map<String, String> productName) {
        CustomOAuth2User user = (CustomOAuth2User) authentication.getPrincipal();

        UserEntity userInfo = userService.getUserInfo(user);
        String name = productName.get("productName");
        System.out.println(name);
        boolean result = userService.choicePiece(userInfo, name);

        if (result) {
            return ResponseEntity.status(HttpStatus.OK).body(userInfo);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("상품 없음");
    }

    @PostMapping("/wallet")
    public ResponseEntity<?> updateWalletAddress(Authentication authentication, @RequestBody Map<String, String> walletAddress) {
        CustomOAuth2User user = (CustomOAuth2User) authentication.getPrincipal();

        UserEntity userInfo = userService.getUserInfo(user);
        userService.updateWallet(userInfo, walletAddress.get("address"));
        return ResponseEntity.status(HttpStatus.OK).body(userInfo);
    }
}
