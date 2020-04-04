export const slugify = (text: string) =>
  text && text.trim().toLowerCase().replace(/\s+/, '-');
