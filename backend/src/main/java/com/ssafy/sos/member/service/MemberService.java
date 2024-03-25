package com.ssafy.sos.member.service;

import com.ssafy.sos.member.domain.TodayVisited;
import com.ssafy.sos.member.repository.TodayVisitedRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {
    private final TodayVisitedRepository todayVisitedRepository;

    public boolean checkAttendance(Long memberId) {
        // 이미 오늘 방문했으면
        if (todayVisitedRepository.existsById("TodayVisited:" + memberId)) {
            return false;
            // 오늘 방문한 적이 없으면
        } else {
            TodayVisited todayVisited = TodayVisited.builder()
                    .id(memberId)
                    .visitedTime(LocalDateTime.now())
                    .build();

            todayVisitedRepository.save(todayVisited);
            return true;
        }
    }

    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul")
    public void cleanTodayVisited() {
        log.info("redis today visited clean!");
        todayVisitedRepository.deleteAll();
    }
}
