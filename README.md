# 2022 Capstone10 Frontend

# How to Start

## 초기 환경설정
### 1. 기본 설정
- Typescript 
- React
```shell
yarn add yarn create-react-app styling-with-styled-components --template typescript 
yarn add typescript @types/node @types/react @types/react-dom @types/jest
```
### 2. 그 외 기능들
- React Router Dom v6
- Recoil
- Styled Components
```shell
yarn add react-router-dom @types/react-router-dom

yarn add recoil @types/recoil

yarn add styled-components @types/styled-components
yarn add babel-plugin-styled-components
```
## 시작하는 법

### 1. 로컬 환경

```shell
yarn start
```
## FE 구조
```
...
├── public/
│   ├── image/
│   │   └──...
│   ├── favicon.ico
│   └── index.html
├── src/
│  ├── api/
│  ├── component/
│  │  ├──header/
│  │  └──navigationBar/
│  ├── hook/
│  ├── router/
│  ├── page/
│  ├── state/
│  ├── App.tsx
│  └── index.tsx
...
```
