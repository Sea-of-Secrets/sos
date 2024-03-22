package com.ssafy.sos.game.controller;

import com.ssafy.sos.game.domain.Board;
import com.ssafy.sos.game.domain.Player;
import com.ssafy.sos.game.domain.RoomRequest;
import com.ssafy.sos.game.domain.Room;
import com.ssafy.sos.game.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Optional;

@Controller
@RequestMapping("/room")
@RequiredArgsConstructor
public class RoomController {
    private final GameService gameService;
    private final Board board;

    @PostMapping("/make")
    public ResponseEntity<Room> makeRoom(@RequestBody RoomRequest roomRequest,
                                         @RequestHeader(value = "Authorization") Optional<String> accessToken) {
        // TODO: 유효한 Token인지 검증 필요
        Boolean isMember = accessToken.isPresent();
        Player player = Player.builder()
                .nickname(roomRequest.getNickname())
                .isMember(isMember)
                .build();

        Room room = gameService.makeRoom(player, roomRequest.getGameMode());
        System.out.println(room.getGameMode());
        return ResponseEntity.ok(room);
    }

    @PostMapping("/enter")
    public ResponseEntity<?> enterRoom(@RequestBody RoomRequest roomRequest,
                                       @RequestHeader(value = "Authorization") Optional<String> accessToken) {
        // TODO: 유효한 Token인지 검증 필요
        Boolean isMember = accessToken.isPresent();
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
        int playerLimit = 0;
        switch(room.getGameMode()) {
            case ONE_VS_ONE -> { playerLimit = 2; }
            case ONE_VS_THREE -> { playerLimit = 4; }
        }

        if (playerLimit > 0 && room.getInRoomPlayers().size() == playerLimit) {
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
}
