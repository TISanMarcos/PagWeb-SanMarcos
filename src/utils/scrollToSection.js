const HEADER_OFFSET = 72;

export const scrollToSection = (sectionId) => {
  const el = document.getElementById(sectionId);
  if (!el) return false;

  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
  return true;
};
