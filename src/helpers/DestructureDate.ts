export const DestructureDate = (date: Date) => {
    return{
        year: date.getFullYear(),
        month: date.getMonth()+1,
        date: date.getDate(),
        hour: date.getHours(),
        minutes: date.getMinutes(),
    }
}