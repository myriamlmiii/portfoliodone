/** Single source for contact addresses used by the page, the forms and the assistant. */
export const contact = {
  email: "lmeriem28@gmail.com",
  academicEmail: "m.lmoubariki@aui.ma",
} as const;

/** "a@x.com or b@y.ma", for sentences that point visitors to email. */
export const emailsInline = `${contact.email} or ${contact.academicEmail}`;
