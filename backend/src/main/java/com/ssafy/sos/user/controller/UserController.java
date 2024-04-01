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
    public ResponseEntity<String> updateUserName(Authentication authentication) {
        CustomOAuth2User user = (CustomOAuth2User) authentication.getPrincipal();
        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("권한 없음");
        }

        UserEntity userInfo = userService.getUserInfo(user);

        userRepository.updateUsernameById(userInfo.getId(), userInfo.getUsername());
        return ResponseEntity.ok("OK");
    }

    @GetMapping("/records")
    public ResponseEntity<List<GameRecord>> getGameRecords(@RequestParam String nickname,
                                                           @RequestHeader(value = "Authorization") Optional<String> accessToken) {
        List<GameRecord> gameRecords = null;
        if (accessToken.isPresent()) {
            Optional<GameRecordMember> gameRecordMember = gameMemberRepository.findByUsername(nickname);
            if (gameRecordMember.isPresent()) {
                gameRecords = gameRecordMember.get().getGameRecords();
            }
        }

        return ResponseEntity.ok(gameRecords);
    }

    @GetMapping("/pieces")
    public ResponseEntity<?> getPiecesList(Authentication authentication) {
        CustomOAuth2User user = (CustomOAuth2User) authentication.getPrincipal();

        UserEntity userInfo = userService.getUserInfo(user);
        List<Product> purchasesByUser = userService.findPurchasesByUser(userInfo);

        return ResponseEntity.ok(purchasesByUser);
    }

    @PostMapping("/pieces")
    public ResponseEntity<?> choicePiece(Authentication authentication, @RequestParam Integer productId) {
        CustomOAuth2User user = (CustomOAuth2User) authentication.getPrincipal();

        UserEntity userInfo = userService.getUserInfo(user);
        boolean result = userService.choicePiece(userInfo, productId);

        if (result) {
            return ResponseEntity.status(HttpStatus.OK).body(userInfo);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("상품 없음");
    }
}
