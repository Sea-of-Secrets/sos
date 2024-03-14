export function matcher<T extends string, K>(map: Record<T, K>) {
  return (key: T) => map[key];
}
