# 온라인 배틀 퍼즐 게임 Puzzle-Pop!

![image.png](./readmeImage/main.gif)

# Overview

정적이고 맞추기만 하는 퍼즐 게임은 이제 그만!

온라인으로 아이템을 사용하며 상대방과 배틀 퍼즐을 시작하세요!

# Puzzle-Pop 서비스 화면

### 인게임


### 빠른 매칭


### 대기실


### 상점


### NFT


# 주요 기능

### 서비스 소개


### 프로젝트 기능


### 개발환경

- OS
  - Local : Windows 10
  - AWS : Ubuntu 20.04.4 LTS
- IDE
  - IntelliJ IDE 2023.3.2
  - Visual Studio Code 1.70.0
- UI / UX
  - Figma
- DataBase
  - MySQL workbench 8.0.20 (Windows 10)
  - MariaDB
- CI/CD
  - Jenkins

### 상세 스택

- Backend
  - JAVA - Zulu 17
  - Gradle 8.5
  - SpringBoot 3.2.1, JPA, Lombok 1.18.20
  - security6, oauth-client2, jjwt 0.11.5
  - JUnit5
  - Stomp 2.3.4
- FrontEnd
  - HTML5, CSS3, JavaScript(ES6)
  - Node.js 18.18, Vite 5.0.8
  - @stomp/stompjs 7.0.0

### 협업 툴

- 이슈 관리 : Jira
- 형상 관리 : Gitlab, Git
- 커뮤니케이션 : Notion, MatterMost, Discord

### 서비스 아키텍처


### API 명세서


### 화면 설계서


### Git Commit 컨벤션

- `feat` : 새로운 기능 추가
- `fix` : 버그 수정
- `docs` : 문서 내용 변경
- `style` : 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우 등
- `refactor` : 코드 리팩토링
- `test` : 테스트 코드 작성
- `chore` : 빌드 수정, 패키지 매니저 설정, 운영 코드 변경이 없는 경우 등

```
type: subject

ex) 회원가입 기능

- feat: Join in
```

### Git Branch 전략

`git-flow`전략

- `master`
- `develop`
- `feat/fe/function1`
- `feat/be/function2`

### Jira


### ERD


### EC2 포트 정리

| Port |                      |
| ---- | -------------------- |
| 8080 | Jenkins      |
| 8081 | Spring boot      |
| 80   | nginx HTTP 기본 포트 |
| 443  | nginx HTTPS          |
| 3306 | MariaDB                |
| 3000 | Next.js app            |
| 4000 | Express.js app            |


### 팀원 역할

