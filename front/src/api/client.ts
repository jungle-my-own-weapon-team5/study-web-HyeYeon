/// <reference types="vite/client" />
// import.meta.env.VITE_API_BASE_URL 같은 Vite 환경변수 타입을 사용하기 위한 선언이다.
// import.meta.env 타입: Vite가 프론트엔드 코드에서 환경변수를 읽게 해주는 객체

import { getToken } from "./token";
import type { LoginInput, LoginResponse, RegisterInput, User } from "../types/auth";

//API 서버 기본 주소 지정
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

//모든 API 요청에서 공통으로 쓸 request() 함수
export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    
    //1. 토큰 얻어서 헤더 새로 만들기
    const token = getToken();
    const headers = new Headers(options.headers)

    if(token)
        headers.set("Authorization", `Bearer ${token}`);
    

    //2. 새로 만든 헤더 붙여서 fetch로 서버에 http요청 보내기

    //요청 URL 만들기: API_BASE_URL +path
    const url = `${API_BASE_URL}${path}`

    const response = await fetch(url, {
        ...options,
        headers,
    });

    //예외처리
    // response.ok는 HTTP status가 200~299일 때 true
    if(!response.ok) {
        const errorBody = await response.json().catch(() => null);
        const message = errorBody?.detail ?? "요청에 실패했습니다.";

        throw new Error(message);
    }

    //2. 응답 바디 json으로 추출
    const data = await response.json();

    return data as Promise<T>;
}

//로그인 API
export async function login(input: LoginInput) {
    return request<LoginResponse>("/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(input),
    })
}

//회원가입 API
export async function register(input: RegisterInput) {
    return request<User>("/auth/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(input),
    })
}