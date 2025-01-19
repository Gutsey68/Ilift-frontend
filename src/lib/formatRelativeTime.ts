/**
 * Formate une date en texte relatif en français (ex: "il y a 2 jours")
 *
 * @param dateString - La date à formater au format ISO string
 * @returns Une chaîne de caractères représentant le temps écoulé en format relatif
 */
export function formatRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const elapsed = now.getTime() - date.getTime();

  const rtf = new Intl.RelativeTimeFormat('fr', { numeric: 'auto' });

  const seconds = Math.floor(elapsed / 1000);
  if (seconds < 60) return rtf.format(-seconds, 'second');

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return rtf.format(-minutes, 'minute');

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return rtf.format(-hours, 'hour');

  const days = Math.floor(hours / 24);
  if (days < 7) return rtf.format(-days, 'day');

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return rtf.format(-weeks, 'week');

  const months = Math.floor(days / 30);
  if (months < 12) return rtf.format(-months, 'month');

  const years = Math.floor(days / 365);
  return rtf.format(-years, 'year');
}
