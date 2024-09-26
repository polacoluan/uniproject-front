// utils/typeUtils.ts
export function isString(value: string | string[]): value is string {
    return typeof value === 'string';
}
