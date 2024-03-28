package com.ssafy.sos.user.service;

import com.ssafy.sos.user.domain.CustomOAuth2User;
import com.ssafy.sos.user.domain.TodayVisited;
import com.ssafy.sos.user.domain.UserEntity;
import com.ssafy.sos.user.repository.TodayVisitedRepository;
import com.ssafy.sos.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final TodayVisitedRepository todayVisitedRepository;

    public boolean checkAttendance(Long userId) {
        // 이미 오늘 방문했으면
        if (todayVisitedRepository.existsById("TodayVisited:" + userId)) {
            return false;
            // 오늘 방문한 적이 없으면
        } else {
            TodayVisited todayVisited = TodayVisited.builder()
                    .id(userId)
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

    public UserEntity getUserInfo(CustomOAuth2User user) {
        UserEntity userEntity = userRepository.findByUsername(user.getUserDto().getUsername());
        System.out.println(userEntity);
        if (userEntity == null) {
            System.out.println("지갑 없음");
            return null;
        }
        return userEntity;
    }
}
