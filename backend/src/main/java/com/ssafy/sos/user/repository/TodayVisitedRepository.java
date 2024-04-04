package com.ssafy.sos.user.repository;

import com.ssafy.sos.user.domain.TodayVisited;
import org.springframework.data.repository.CrudRepository;

public interface TodayVisitedRepository extends CrudRepository<TodayVisited, Long> {
}
