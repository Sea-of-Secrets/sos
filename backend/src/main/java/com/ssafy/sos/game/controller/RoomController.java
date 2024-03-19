package com.ssafy.sos.game.controller;

import com.ssafy.sos.game.domain.Board;
import com.ssafy.sos.game.domain.RoomRequest;
import com.ssafy.sos.game.domain.Room;
import com.ssafy.sos.game.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/room")
@RequiredArgsConstructor
public class RoomController {
    private final GameService gameService;
    private final Board board;

    @PostMapping("/make")
    public ResponseEntity<Room> makeRoom(@RequestBody RoomRequest roomRequest) {
        Room room = gameService.makeRoom(roomRequest.getNickname(), roomRequest.getGameMode());
        System.out.println(room.getGameMode());
        return ResponseEntity.ok(room);
    }

    @PostMapping("/enter")
    public ResponseEntity<?> enterRoom(@RequestBody RoomRequest roomRequest) {
        String nickname = roomRequest.getNickname();
        String roomCode = roomRequest.getGameId();
        // 존재하지 않는 입장코드라면
        if (!board.getRoomMap().containsKey(roomCode)) {
            return ResponseEntity.ok("ROOM NOT EXIST");
        }

        // room 이 이미 다 찬 방이라면 return
        if (board.getRoomMap().get(roomCode).getInRoomPlayers().size() == 4) {
            return ResponseEntity.ok("Already Fulled");
        }

        Room room = gameService.enterRoom(roomCode, nickname);
        return ResponseEntity.ok(room);
    }
}
