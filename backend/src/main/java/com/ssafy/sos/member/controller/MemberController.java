package com.ssafy.sos.member.controller;

import com.ssafy.sos.member.domain.UserEntity;
import com.ssafy.sos.member.domain.UserNicknameRequest;
import com.ssafy.sos.member.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/members")
public class MemberController {
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<Optional<UserEntity>> getUserInfo(@RequestParam int id) {
        // TODO: Auth 정보를 통해 조회하는 것으로 변경 필요
        Long memberId = (long) id;
        Optional<UserEntity> userInfo = userRepository.findById(memberId);
        return ResponseEntity.ok(userInfo);
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
}
