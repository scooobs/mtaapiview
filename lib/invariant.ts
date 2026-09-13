export function invariant<T>(
  condition: unknown,
  msg?: string | undefined
): asserts condition {
  if (!condition) {
    throw new Error(msg ?? "invariant check failed")
  }
}
