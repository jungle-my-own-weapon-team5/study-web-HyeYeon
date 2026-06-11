const TOKEN_KEY = "access_token"

export function saveToken(token: string) {
  // localStorage에 token 저장
  localStorage.setItem(TOKEN_KEY, token)
}

export function getToken() {
  // localStorage에서 token 읽기
  return localStorage.getItem(TOKEN_KEY)
}

export function removeToken() {
  // localStorage에서 token 삭제
  localStorage.removeItem(TOKEN_KEY)
}