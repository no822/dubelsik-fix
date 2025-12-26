# AGENTS (두벌식 변환기)

## Roles

- Dev: 구현 및 테스트 작성, 커밋 메시지 작성.
- Reviewer: 로직/테스트/설정 리뷰, 가독성·엣지 케이스 확인.
- Tester: Vitest 실행, 시나리오 점검, 리그레션 추가.

## Workflow (TDD 중심)

1. 사례 선정: 키 입력 → 기대 한글을 작은 단위로 정의 (단모음, 겹모음, 된소리, 받침/겹받침, 이어쓰기).
2. 테스트 추가: 실패하는 테스트부터 작성/갱신.
3. 구현/리팩터: 최소 변경으로 테스트 통과.
4. 리뷰 체크: 상태머신 전이, 조합/분리 규칙, 비한글 통과 확인.
5. 반복: TODO 항목을 하나씩 처리하며 커밋.

## Commit (Conventional)

- feat: 기능 추가/변경 (예: `feat: handle complex final split`)
- fix: 버그 수정
- test: 테스트 추가/수정만
- chore: 도구/설정/문서/잡무
- refactor: 기능 변화 없이 구조 개선

## Command cheats

- `task install` / `task test` / `task test:watch` / `task build` / `task dev -- <text>`

## Definition of Done (MVP)

- 변환 함수가 주요 조합(단/겹 모음, 된소리, 단/겹 받침, 받침 분리) 테스트를 통과.
- CLI가 입력/도움말/에러 처리 정상.
- TODO.md의 MVP 섹션 완료 체크.
