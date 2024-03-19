package com.ssafy.sos.game.controller;

import com.ssafy.sos.game.domain.MakeRoomRequest;
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

    @PostMapping("/make")
    public ResponseEntity<Room> makeRoom(@RequestBody MakeRoomRequest makeRoomRequest) {
        Room room = gameService.makeRoom(makeRoomRequest.getNickname());
        return ResponseEntity.ok(room);
    }
}
