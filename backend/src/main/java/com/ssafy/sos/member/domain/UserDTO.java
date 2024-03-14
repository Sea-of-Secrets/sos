package com.ssafy.sos.member.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDTO {
    private String role;
    private String name;
    private String username;
}
