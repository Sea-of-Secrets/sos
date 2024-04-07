import { deleteCookie } from "~/_lib/utils";

const ACCESS_COOKIE_KEY = "access";
const REFRESH_COOKIE_KEY = "refresh";

export const deleteAuthCookie = () => {
  deleteCookie(ACCESS_COOKIE_KEY);
  deleteCookie(REFRESH_COOKIE_KEY);
};

export const parseCookie = (cookie: string) => {
  const cookies = cookie.split("; ");
  let accessCookie = "";
  let refreshCookie = "";

  for (const cookie of cookies) {
    const [key, value] = cookie.split("="); // 쿠키 문자열을 '=' 기준으로 분리하여 키와 값을 추출
    if (key === ACCESS_COOKIE_KEY) {
      accessCookie = value;
    } else if (key === REFRESH_COOKIE_KEY) {
      refreshCookie = value;
    }
  }

  return { accessCookie, refreshCookie };
};
