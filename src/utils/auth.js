const tokenKey = 'tokenKey'

export function getToken() {
  return sessionStorage.getItem(tokenKey)
}

export function setToken(token) {
  return sessionStorage.setItem(tokenKey, token)
}

export function removeToken() {
  return sessionStorage.removeItem(tokenKey)
}
