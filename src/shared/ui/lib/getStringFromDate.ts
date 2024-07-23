export const getStringFromDate = (dateString: string): string => {
    const date = new Date(dateString);
    const padZero = (num: number): string => num.toString().padStart(2, '0');
    
    const day = padZero(date.getDate());
    const month = padZero(date.getMonth() + 1); // Месяцы в JavaScript начинаются с 0
    const year = date.getFullYear();
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());

    return `${day}.${month}.${year} ${hours}:${minutes}`;
};