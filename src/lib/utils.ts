// src/lib/utils.ts
export function cn(...classes: (string | undefined | boolean)[]): string {
  return classes
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}