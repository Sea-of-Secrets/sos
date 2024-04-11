# 🏴‍☠️ SOS : Sea of Secrets
해적과 해군의 쫓고 쫓기는 추리/추격 온라인 보드 게임 ! 

![main](./README_IMAGE/main.png)

## 💡 주요 기능
- `게임` 플레이어와 함께 추격 보드 게임을 즐길 수 있습니다.
- `상점` 획득한 골드로 나만의 NFT 말을 뽑을 수 있습니다.
- `NFT` NFT 지갑을 발행해주고, 획득한 게임 말을 지갑에서 확인할 수 있습니다.

## 🔎 서비스 소개

![rule](./README_IMAGE/rule.png)
![page](./README_IMAGE/page.png)
![store](./README_IMAGE/store.png)

## 🖥️ 화면 예시


## ⚒️ 기술 소개
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

- Blockchain API Server
  - node.js 18.17
  - ethers.js 6.11.1
  - express 4.18.3
  - NFT.storage 7.1.1
  - web3 4.6.0
  - blocksdk-js 3.1.0

- Smart Contract
  - @chainlink/contracts 0.2.1
  - hardhat 2.11.0
  - openzeppelin/contracts 5.0.0
  - openzeppelin-solidity 2.2.0
  - mocha 9.2.1

- FrontEnd
  - npm: >=9
  - node: >=18
  - TypeScript: >=5
  - React: >=18
  - Next.js: >=14
  - Three.js: 0.162.0
  - @stomp/stompjs: 7.0.0
  - Zustand: 4.5.2
  - sass: 1.71.1
  - @emotion/react: 11.11.4, @emotion/styled: 11.11.0
  - prettier: 3.2.5
  - eslint: >=8
  - jest: >=29
  - leva: 0.9.35

### 협업 툴

- 이슈 관리 : Jira
- 형상 관리 : Gitlab, Git
- 커뮤니케이션 : Notion, MatterMost, Discord

### 아키텍처 다이어그램
![image.png](./README_IMAGE/architecture.png)

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

- feat: Join in #Jira Issue Number
```

### Git Branch 전략

- `master`
- `develop`
- `feat/fe/function1`
- `feat/be/function2`

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


## 팀원
|**김재형**|**용상윤**|**이재종**|**이주연**|**이주희**|**최승준**|
|:--:|:--:|:--:|:--:|:--:|:--:|
|BE(게임엔진)|FE(상점)|FE(인게임)|BE(마이페이지) <br> 블록체인|BE(게임엔진) <br> 팀장|BE(상점)<br> 인프라
