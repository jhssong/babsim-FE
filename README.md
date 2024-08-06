# README

# 🍚 나만의 레시피 서비스, 밥심

---
<img src="https://github.com/user-attachments/assets/c92b1e05-87a0-44c9-9d11-d38a5dd54c46" width="900">

- 개발 기간 : 24.07.10 ~ 24.08.06
- 배포 URL : [**babsim-59d06.web.app**](https://babsim-59d06.web.app/)
- 백엔드 GitHub : https://github.com/lwj0831/babsim_BE
- 로그인 후 사용해야 모든 기능 사용 가능

## 🍱 프로젝트 소개

---

1. 레시피 공유
    1. 나만의 레시피를 서비스에 등록
    2. 기존 레시피를 취향에 맞게 변형(포크)하여 공유
2. 나만의 레시피 NFT
    1. 등록한 레시피를 NFT로 생성
    2. 마켓에서 레시피 NFT 거래
3. 보상 체계
    1. 리뷰 작성 시 리뷰 작성자에게 일정 비율의 포인트 제공
    2. 리뷰 작성 시 대상 레시피 소유자에게도 일정 비율의 포인트 제공
4. 레시피 상세 정보
    1. 알레르기 필터링을 적용한 레시피 추천, 검색
    2. Gemini를 이용한 요리 영양 성분 분석

## 😎 팀원 소개

---
| 임준혁 | 조재용 | 이원준 | 송재훈 |
| --- | --- | --- | --- |
| <img src="https://avatars.githubusercontent.com/u/139840247?v=4" width="128"> | <img src="https://avatars.githubusercontent.com/u/66457807?v=4" width="128"> | <img src="https://avatars.githubusercontent.com/u/151692917?v=4" width="128"> | <img src="https://avatars.githubusercontent.com/u/86557146?v=4" width="128"> |
| [@ijh1298](https://github.com/ijh1298) | [@WithJo](https://github.com/WithJo) | [@lwj0831](https://github.com/lwj0831) | [@jhssong](https://github.com/jhssong) |

## 🛠️ 개발 환경

---

- FrontEnd : React, Emotion, MUI, Recoil, Firebase
- BackEnd : Spring Framework ,Spring Data JPA, Spring WebFlux, KAS(Klaytn Api Service), Gemini, CloudType
- 협업 툴 : GitHub, Discord, Notion, Figma
- [깃 컨벤션](https://www.notion.so/1f29b747f311451484f26e45127ac2af?pvs=21)

## ⛑️ 역할 분담

---

### FrontEnd

- 😊임준혁
    - 페이지 : 레시피 상세 보기(레시피 작성, 수정, 포크), 리뷰 보기, 작성
    - 컴포넌트 :  NFT 버튼
- 😁조재용
    - 페이지 : home, market, recipe, scrap, mypage
    - 컴포넌트 : appbar, navbar, card

### BackEnd

- 😆이원준
    - 레시피 관련 도메인 전반 API 개발
    - Gemini API를 이용한 레시피에 대한 알레르기, 영양 정보 자동 생성 서비스 개발
    - KAS(Klaytn API Service)를 이용한 NFT 발급/전송 서비스 개발
- 😋송재훈
    - 멤버, 포인트 도메인 API 개발
    - FireBase를 이용한 이미지 서버 개발
    - CloudType을 이용한 서비스 배포

## 📚 페이지별 기능

---

### 홈 페이지
<img src="https://github.com/user-attachments/assets/1282439f-65b3-4399-ad8e-3e49d0e97705" width="390" height="844">

- 주간 레시피, 추천 상품, 추천 레시피(로그인 시)

### 마켓 페이지
<img src="https://github.com/user-attachments/assets/ad926b55-6d91-4ec0-aee4-3f28205e8b7a" width="390" height="844">

- 배너, 추천 레시피 NFT, 추천 마켓 상품

### 레시피 페이지
<img src="https://github.com/user-attachments/assets/4993346f-47c0-4bbd-ae0c-fbe3dc8f8276" width="390" height="844">

- 카테고리별 레시피 보기, 알레르기 필터

### 레시피 검색 페이지
<img src="https://github.com/user-attachments/assets/bfa809ed-410f-480d-b2ef-d15f7f1a664c" width="390" height="844">

- 최근/인기 검색어 표시

### 레시피 상세 페이지
<img src="https://github.com/user-attachments/assets/323961b8-010b-4dc0-b488-f35bda4b8a9b" width="390" height="844">

- 레시피 상세 정보, 알레르기, 영양 성분, 재료, 요리법 정보, 리뷰
- 포크하기, 요리하기

### 스크랩 페이지
<img src="https://github.com/user-attachments/assets/72ceb4c0-e7af-4b9c-a1bf-dde01ef09cbb" width="390" height="844">

- 찜한 레시피
- 포크한 레시피
- 소유한 레시피

### 마이 페이지
<img src="https://github.com/user-attachments/assets/8cb00ded-9e9c-4aec-a419-2269c0bafbf7" width="390" height="844">

- 로그인 정보, 포인트 거래 내역
- 로그아웃 및 탈퇴

## ✍️ 개선 목표

---

- FrontEnd
    - UI
    - 반복되는 이미지 로딩 개선 (Performance 개선)
- BackEnd
    - 주간마다 레시피 랭킹에 따른 NFT소유자 리워드 제공 로직 추가
    - 자체 포인트 -> Klay코인으로 변경
    - 결제 서비스 도입
