import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, getPageMeta } from '../../constants/seo';

const upsertMeta = (selector, attributes) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    document.head.appendChild(el);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    el.setAttribute(key, value);
  });
};

const upsertLink = (rel, href) => {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

const PageMeta = () => {
  const { pathname } = useLocation();
  const { title, description } = getPageMeta(pathname);
  const canonical = `${SITE_URL}${pathname === '/' ? '' : pathname}`;

  useEffect(() => {
    document.title = title;

    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertLink('canonical', canonical);

    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: DEFAULT_OG_IMAGE });
    upsertMeta('meta[property="og:image:secure_url"]', {
      property: 'og:image:secure_url',
      content: DEFAULT_OG_IMAGE,
    });
    upsertMeta('meta[property="og:image:alt"]', {
      property: 'og:image:alt',
      content: 'San Marcos Mascotas — Mayoreo de alimento y productos para mascotas',
    });
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'es_MX' });

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: DEFAULT_OG_IMAGE });
  }, [title, description, canonical]);

  return null;
};

export default PageMeta;
