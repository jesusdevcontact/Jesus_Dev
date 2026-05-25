const CONTACT_EMAIL = 'jesusdevcontact@gmail.com';
const DEFAULT_SUBJECT = 'Consulta profesional · Jesus Martinez Escobar';
const DEFAULT_BODY = `Buenas,

Me pongo en contacto contigo desde tu portfolio.

Nombre:
Empresa:
Mensaje:

`;

export function buildContactMailto(subject = DEFAULT_SUBJECT, body = DEFAULT_BODY): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
