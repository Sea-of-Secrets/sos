package com.ssafy.sos.user.controller;

import com.ssafy.sos.game.domain.record.GameRecord;
import com.ssafy.sos.game.domain.record.GameRecordMember;
import com.ssafy.sos.game.repository.GameMemberRepository;
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
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("로그인 해야함. 여길 어떻게 왔지?");
        }

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
    public ResponseEntity<String> updateUserName(@RequestBody UserNicknameRequest user) {
        // TODO: Auth 정보를 통해 변경하는 것으로 변경 필요
        userRepository.updateUsernameById(user.getId(), user.getUsername());
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
}
