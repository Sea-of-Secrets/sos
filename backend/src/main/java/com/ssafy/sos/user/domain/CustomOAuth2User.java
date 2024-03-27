package com.ssafy.sos.user.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

@Getter @Setter
public class CustomOAuth2User implements OAuth2User {
    private final UserDTO userDto;

    public CustomOAuth2User(UserDTO userDto) {

        this.userDto = userDto;
    }

    @Override
    public Map<String, Object> getAttributes() {

        return null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Collection<GrantedAuthority> collection = new ArrayList<>();

        collection.add(new GrantedAuthority() {

            @Override
            public String getAuthority() {

                return userDto.getRole();
            }
        });

        return collection;
    }

    @Override
    public String getName() {

        return userDto.getName();
    }

    public String getUsername() {

        return userDto.getUsername();
    }
}
