export const CONTACT_EMAIL = 'jesusdevcontact@gmail.com';

export function buildContactMailto(subject: string, body: string): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
