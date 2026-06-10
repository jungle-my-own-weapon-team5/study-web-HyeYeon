//#region 회원가입 타입 
export interface RegisterInput {
    email: string;
    password: string;
}

export interface User {
    id : number;
    email: string;
}

//#endregion

//#region 로그인 타입
export interface LoginInput {
    email: string;
    password: string;
}

export interface LoginResponse  {
    access_token: string
    token_type: string
}
//#endregion
