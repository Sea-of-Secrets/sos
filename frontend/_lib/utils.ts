export function matcher<T extends string, K>(map: Record<T, K>) {
  return (key: T) => map[key];
}

export function isNumber(value: any) {
  return !Number.isNaN(parseInt(value, 10));
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
