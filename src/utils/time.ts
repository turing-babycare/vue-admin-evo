export function addZero(s: number | string) {
  return Number(s) < 10 ? '0' + s : s;
}

export function flatten(arr: any): any[] {
  let result = [] as any[];
  for (let i = 0, len = arr.length; i < len; i++) {
    const children = arr[i].children;
    if (children?.length) {
      result = result.concat(flatten(children));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
