/**
 * Reminders for unconfirmed content ("Pending" badges, the "To confirm" box) are hidden by default
 * so visitors never see them. Set NEXT_PUBLIC_SHOW_PENDING=true in .env.local to see them while editing.
 */
export const SHOW_PENDING = process.env.NEXT_PUBLIC_SHOW_PENDING === "true";
