# my-movie-log

## 개요
- 해당 프로젝트는 AI 프롬포트 능력을 향상 시키고, 해당 능력을 바탕으로 기획 및 아키텍쳐 설계 후 실제 구햔까지의 과정을 연습하는 토이프로젝트입니다.

## 배포 정보
- 서비스 URL: movie-log-orcin.vercel.app

## 프로젝트 개요
본 프로젝트는 개인적인 영화 감상 기록을 관리하고, 최신 웹 프레임워크의 배포 라이프사이클을 실습하기 위해 기획된 토이 프로젝트입니다. 영화 검색부터 리뷰 작성, 시각화된 데이터 분석 및 AI 기반 추천까지 이어지는 엔드 투 엔드(End-to-End) 웹 애플리케이션 구현에 초점을 맞추었습니다.

## 핵심 기능
1. 영화 검색: TMDB API를 연동하여 실시간 영화 정보 검색 및 상세 데이터 제공
2. 리뷰 아카이빙: 개인별 평점 및 감상평 기록 (Supabase DB 활용)
3. 데이터 시각화: 감상 기록을 기반으로 선호 장르 통계 및 시계열 데이터 차트 제공
4. AI 추천 시스템: 사용자 취향을 분석하여 Google Gemini AI가 영화 추천 및 사유 생성

## 기술 스택

### Frontend
- Core: Next.js 16 (App Router), TypeScript
- Styling: Tailwind CSS 4
- Visualization: Recharts
- State & Hooks: React Custom Hooks

### Backend & Infrastructure
- Database/Auth: Supabase
- Deployment: Vercel

### External APIs
- AI Engine: Google Gemini 2.5 Flash
- Movie Data: The Movie Database (TMDB)

## 설치 및 실행 방법

### 1. 저장소 복제
```bash
git clone https://github.com/qkrwnscjf/Movie_log.git
cd Movie_log
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
루트 디렉토리에 `.env.local` 파일을 생성하고 아래 항목을 입력합니다.
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

### 4. 로컬 서버 실행
```bash
npm run dev
```

## 환경 변수 상세 가이드
배포 시 Vercel 설정(Settings > Environment Variables)에서 다음 4가지 항목을 반드시 등록해야 정상적인 서비스 이용이 가능합니다.
- NEXT_PUBLIC_SUPABASE_URL: Supabase 프로젝트 URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY: Supabase 익명 API 키
- NEXT_PUBLIC_TMDB_API_KEY: TMDB API 키
- NEXT_PUBLIC_GEMINI_API_KEY: Google Gemini API 키
