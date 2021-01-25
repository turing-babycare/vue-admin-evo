export function addZero(s: number | string) {
  return Number(s) < 10 ? '0' + s : s;
}
