export const NormalizeDate = (val: string|Date) => {
    return new Date(val).toISOString().split('T')[0]
}