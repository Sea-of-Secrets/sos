package com.ssafy.sos.game.controller;

import com.ssafy.sos.game.domain.Board;
import com.ssafy.sos.game.domain.Player;
import com.ssafy.sos.game.domain.RoomRequest;
import com.ssafy.sos.game.domain.Room;
import com.ssafy.sos.game.service.GameService;
import com.ssafy.sos.game.service.MatchingService;
import com.ssafy.sos.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/room")
@RequiredArgsConstructor
public class RoomController {
    private final GameService gameService;
    private final MatchingService matchingService;
    private final UserService userService;
    private final Board board;

    @PostMapping("/make")
    public ResponseEntity<Room> makeRoom(@RequestBody RoomRequest roomRequest,
                                         Authentication authentication) {
        Boolean isMember = (authentication != null);
        Player player = Player.builder()
                .nickname(roomRequest.getNickname())
                .isMember(isMember)
                .build();

        Room room = gameService.makeRoom(player, roomRequest.getGameMode());
        return ResponseEntity.ok(room);

    }

    @PostMapping("/enter")
    public ResponseEntity<?> enterRoom(@RequestBody RoomRequest roomRequest,
                                       Authentication authentication) {
        Boolean isMember = (authentication != null);

        String nickname = roomRequest.getNickname();
        Player newPlayer = Player.builder()
                .nickname(nickname)
                .isMember(isMember)
                .build();

        String roomCode = roomRequest.getGameId();
        // 존재하지 않는 입장코드라면
        if (!board.getRoomMap().containsKey(roomCode)) {
            return ResponseEntity.ok("ROOM_NOT_EXIST");
        }

        Room room = board.getRoomMap().get(roomCode);
        // room 이 이미 다 찬 방이라면 return
        if (room.getInRoomPlayers().size() == room.getGameMode().playerLimit()) {
            return ResponseEntity.ok("ALREADY_FULLED");
        }

        // 방 안에 중복된 닉네임이 있으면 return
        for (Player player : room.getInRoomPlayers()) {
            if (player.getNickname().equals(nickname)) {
                return ResponseEntity.ok("DUPLICATED_NICKNAME");
            }
        }

        room = gameService.enterRoom(roomCode, newPlayer);
        return ResponseEntity.ok(room);
    }

    @PostMapping("/matching")
    public ResponseEntity<?> tryMatching(@RequestBody RoomRequest roomRequest,
                                         Authentication authentication) {
        Boolean isMember = (authentication != null);
        Player player = Player.builder()
                .nickname(roomRequest.getNickname())
                .isMember(isMember)
                .build();
        if (matchingService.enqueue(player)) {
            return ResponseEntity.ok("OK");
        } else {
            return ResponseEntity.ok("DUPLICATED_NICKNAME");
        }
    }

    @PatchMapping("/matching")
    public ResponseEntity<?> cancelMatching(@RequestBody Player player) {
        matchingService.dequeue(player.getNickname());
        return ResponseEntity.ok("CANCEL_ACCEPTED");
    }
}
