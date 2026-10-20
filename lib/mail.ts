import { contact } from "@/data/contact";

type Outgoing = { subject: string; text: string; replyTo: string };
export type Delivery = { sent: true } | { sent: false; mailto: string };

/**
 * Delivers a form submission to both inboxes. With RESEND_API_KEY (and optionally MAIL_FROM) set, the message is
 * sent from the server. Otherwise, or if sending fails, it returns a mailto: link so the visitor's mail app can
 * finish the job and nothing is lost.
 */
export async function deliver({ subject, text, replyTo }: Outgoing): Promise<Delivery> {
  const key = process.env.RESEND_API_KEY;
  if (key) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
      body: JSON.stringify({
        from: process.env.MAIL_FROM ?? "Portfolio <onboarding@resend.dev>",
        to: [contact.email, contact.academicEmail],
        reply_to: replyTo,
        subject,
        text,
      }),
    }).catch(() => null);
    if (res?.ok) return { sent: true };
  }

  const query = `cc=${encodeURIComponent(contact.academicEmail)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  return { sent: false, mailto: `mailto:${contact.email}?${query}` };
}
