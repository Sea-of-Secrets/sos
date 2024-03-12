package com.ssafy.sos.member.repository;

import com.ssafy.sos.member.domain.Member;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long>{

}
