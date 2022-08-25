const TOKEN_STORE_KEY = '_token';
export function getToken() {
  // return window.localStorage.getItem(TOKEN_STORE_KEY);
  return window.document.cookie.split(`${TOKEN_STORE_KEY}=`)[1];
}

export function setToken(v: string) {
  // return window.localStorage.setItem(TOKEN_STORE_KEY, v);
  return (window.document.cookie = `${TOKEN_STORE_KEY}=${v}`);
}

export function removeToken() {
  // return window.localStorage.removeItem(TOKEN_STORE_KEY);
  return (window.document.cookie = '');
}
