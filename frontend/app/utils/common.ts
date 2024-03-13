export function matcher<T extends string>(map: Record<T, string>) {
  return (key: T) => map[key];
}
