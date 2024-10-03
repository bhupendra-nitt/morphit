export function transformData(data: any[], transformFunction: string): any[] {
  const transform = new Function('data', `return ${transformFunction}`);
  // @ts-ignore
  return data.map(transform);
}