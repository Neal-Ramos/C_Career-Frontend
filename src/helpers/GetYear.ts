export function getYear(value: any): string {
    if (value?._isAMomentObject) return value.year().toString();
    const date = new Date(value);
    if (!isNaN(date.getTime())) return date.getFullYear().toString();
    return String(value);
}