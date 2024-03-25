package com.ssafy.sos.member.service;

import com.ssafy.sos.member.domain.TodayVisited;
import com.ssafy.sos.member.repository.TodayVisitedRepository;
import com.ssafy.sos.member.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final TodayVisitedRepository todayVisitedRepository;

    public boolean checkAttendance(Long memberId) {
        if (todayVisitedRepository.findById(memberId).isPresent()) {
            return false;
        } else {
            TodayVisited todayVisited = TodayVisited.builder()
                    .id(memberId)
                    .visitedTime(LocalDateTime.now())
                    .build();

            todayVisitedRepository.save(todayVisited);
            return true;
        }
    }
}
