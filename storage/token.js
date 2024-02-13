import Cookies from 'js-cookie';

export function getToken() {
  return Cookies.get("ACCESS_TOKEN");
}

export function setToken(token) {
  Cookies.set("ACCESS_TOKEN", token, { path: '/' });
  return token;
}

export function removeLocalData() {
  Cookies.remove("ACCESS_TOKEN", { path: '/' });
  Cookies.remove("typeData", { path: '/' });
  Cookies.remove("entityData", { path: '/' });
  return true;
}

export function getVerifyToken() {
  return Cookies.get("VERIFY_TOKEN");
}

export function setVerifyToken(token) {
  Cookies.set("VERIFY_TOKEN", token, { path: '/' });
  return token;
}
