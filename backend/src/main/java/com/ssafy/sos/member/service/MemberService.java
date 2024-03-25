package com.ssafy.sos.member.service;

import com.ssafy.sos.member.domain.TodayVisited;
import com.ssafy.sos.member.repository.TodayVisitedRepository;
import com.ssafy.sos.member.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final TodayVisitedRepository todayVisitedRepository;
    private final UserRepository userRepository;

    public boolean checkAttendance(Long memberId) {
        // 이미 오늘 방문했으면
        if (todayVisitedRepository.existsById("TodayVisited:" + memberId)) {
            return true;
            // 오늘 방문한 적이 없으면
        } else {
            TodayVisited todayVisited = TodayVisited.builder()
                    .id(memberId)
                    .visitedTime(LocalDateTime.now())
                    .build();

            todayVisitedRepository.save(todayVisited);
            return false;
        }
    }

    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul")
    public void cleanTodayVisited() {
        System.out.println("redis clean!");
        todayVisitedRepository.deleteAll();
    }
}
