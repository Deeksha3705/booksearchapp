export const compareDateAsc = (a, b) => {
    const date1 = new Date(a.publishedDate).getTime();
    const date2 = new Date(b.publishedDate).getTime();
    return Math.sign(date1 - date2);
}

export const compareDateDesc = (a, b) => {
    const date1 = new Date(a.publishedDate).getTime();
    const date2 = new Date(b.publishedDate).getTime();
    return Math.sign(date2 - date1);
}