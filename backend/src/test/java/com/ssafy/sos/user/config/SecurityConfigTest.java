package com.ssafy.sos.user.config;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.anonymous;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WithAnonymousUser
@WithUserDetails
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
class SecurityConfigTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void accessAnonymous() throws Exception {
        mockMvc.perform(get("/").with(anonymous()))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void accessUser() throws Exception {
        mockMvc.perform(get("/")
                        .with(user("jake").roles("USER")))

                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("권한 없는 접근")
    public void accessAnonymousForNFT() throws Exception {
        mockMvc.perform(get("/nft/upload").with(anonymous()))
                .andDo(print())
                .andExpect(status().is3xxRedirection());
    }

    @Test
    @DisplayName("권한 있는 접근")
    public void accessUserForNFT() throws Exception {
        mockMvc.perform(get("/nft/upload")
                        .with(user("jake").roles("USER")))
                .andDo(print())
                .andExpect(status().isOk());
    }
}