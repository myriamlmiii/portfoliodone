/** Latin-only text inside an RTL page needs its own direction so punctuation and wrapping land correctly. */
export const dirOf = (text: string | undefined) => (text && !/[\u0600-\u06FF]/.test(text) ? ("ltr" as const) : undefined);
