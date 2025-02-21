# 칸반 Todo List
업무의 효율을 증진시키기 위한 칸반형태의 To-Do List

## 기술 스택

- Framework: `Next.js`
- Language: `TypeScript`
- State Management: `Zustand`
- Drag & Drop: `react-dnd`
- Styling: `Tailwind CSS`


## 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx      # 루트 레이아웃 (전역 UI)
│   └── page.tsx        # 메인 페이지 컴포넌트
├── components/
│   ├── board/          # 보드 관련 컴포넌트
│   ├── todo/           # 할 일 관련 컴포넌트
│   ├── home/           # 페이지 레이아웃 컴포넌트
│   └── common/         # 공통 컴포넌트
├── hooks/              # 커스텀 React 훅
├── store/              # Zustand 스토어 설정
├── type/              # TypeScript 타입 정의
└── const/             # 상수 및 설정
```

## 상태 관리
####  Zustand를 사용하여 전역 상태 관리

- `useBoardStore`: zustand store

#### 상태 변경 작업 액션
- `useBoardActions`: 보드 관련 액션 (CRUD 작업)
- `useTodoActions`: 할 일 관련 액션 (CRUD 작업)

## 드래그 앤 드롭 구현
#### React DnD를 사용하여 다음과 같은 커스텀 훅으로 드래그 앤 드롭 기능을 구현

- `useBoardDrag`: 보드 드래그 앤 드롭 처리
- `useTodoDrag`: 할 일 항목 드래그 앤 드롭 처리

## 시작하기

#### 저장소 클론
```
git clone https://github.com/imfineimgood/KNH_ToDoPage.git
```

#### 의존성 설치
```
npm install
```  
#### 개발 서버 실행
```
npm run dev
```
