/** Public address of the site. Change it here (or set NEXT_PUBLIC_SITE_URL) and every metadata consumer follows. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://meriemlmoubariki.pro").replace(/\/$/, "");
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");
