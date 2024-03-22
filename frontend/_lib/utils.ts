export function matcher<T extends string, K>(map: Record<T, K>) {
  return (key: T) => map[key];
}

export function isNumber(value: any) {
  return !Number.isNaN(parseInt(value, 10));
}
