# my-movie-log

## Deployment
- URL: movie-log-orcin.vercel.app

## 프로젝트 소개
본 프로젝트는 개인적으로 시청한 영화 리뷰를 기록하고, 실제 배포 과정을 경험해 보기 위해 제작된 토이 프로젝트입니다. 사용자는 영화를 검색하여 자신의 평점과 리뷰를 남길 수 있으며, 기록된 데이터를 바탕으로 선호 장르 분석 및 AI 기반 영화 추천 기능을 제공합니다.

## 주요 기능
- 영화 검색 및 상세 정보 확인 (TMDB API 연동)
- 개인별 영화 리뷰 및 평점 기록
- 영화 선호 장르 및 시청 기록 타임라인 시각화 (Recharts)
- 사용자 기록 기반 AI 영화 추천 (Google Gemini API)

## 사용 기술 스택
- Framework: Next.js 16 (App Router)
- Styling: Tailwind CSS 4
- Database / Auth: Supabase
- Data Visualization: Recharts
- External APIs:
  - TMDB API (Movie Data)
  - Google Gemini API (AI Recommendation)
- Language: TypeScript

## 환경 변수 설정
배포 시 다음 환경 변수 설정이 필요합니다.
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_TMDB_API_KEY
- NEXT_PUBLIC_GEMINI_API_KEY
