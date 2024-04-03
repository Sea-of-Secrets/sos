export function matcher<T extends string, K>(map: Record<T, K>) {
  return (key: T) => map[key];
}

export function isNumber(value: any) {
  return !Number.isNaN(parseInt(value, 10));
}

export const parseCookie = (cookie: string) => {
  const cookies = cookie.split("; ");
  let accessCookie = "";
  let refreshCookie = "";

  for (const cookie of cookies) {
    const [key, value] = cookie.split("="); // 쿠키 문자열을 '=' 기준으로 분리하여 키와 값을 추출
    if (key === "access") {
      accessCookie = value;
    } else if (key === "refresh") {
      refreshCookie = value;
    }
  }

  return { accessCookie, refreshCookie };
};
