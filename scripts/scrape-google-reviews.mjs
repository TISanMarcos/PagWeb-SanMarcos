import puppeteer from 'puppeteer-core';
import { writeFileSync } from 'node:fs';

const MAPS_URL =
  'https://www.google.com/maps/place/San+Marcos/@19.3779373,-99.0938304,17z/data=!4m8!3m7!1s0x85d1fdd092ff869b:0xfaafa134cb98c403!8m2!3d19.3779373!4d-99.0938304!9m1!1b1!16s%2Fg%2F1s049rh6x?hl=es-419&entry=ttu';

const SOURCE_URL = 'https://maps.app.goo.gl/ts8DoyLNjxfHdi9k9';
const MAX_REVIEWS = 4;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const parseRelativeDate = (value = '') => {
  const text = value.toLowerCase();
  const match = text.match(/(\d+)\s*(semana|mes|año|día|hora)/);
  if (!match) return Number.MAX_SAFE_INTEGER;
  const amount = Number(match[1]);
  const unit = match[2];
  const multipliers = { hora: 1, día: 24, semana: 24 * 7, mes: 24 * 30, año: 24 * 365 };
  return amount * (multipliers[unit] || 999999);
};

const toAvatarUrl = (url) => (url ? url.replace(/=w\d+-h\d+-/g, '=w128-h128-') : '');

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=es-419'],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  );

  await page.goto(MAPS_URL, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await sleep(3500);

  for (const selector of ['button[aria-label="Aceptar todo"]', 'button[aria-label="Accept all"]']) {
    const btn = await page.$(selector);
    if (btn) {
      await btn.click();
      await sleep(1200);
      break;
    }
  }

  await page.evaluate(() => {
    const stars = Array.from(document.querySelectorAll('button')).find((b) =>
      /estrellas|stars/i.test(b.getAttribute('aria-label') || ''),
    );
    stars?.click();
  });

  await sleep(3500);

  await page.evaluate(() => {
    const sortBtn = Array.from(document.querySelectorAll('button')).find((b) =>
      /ordenar|sort/i.test(b.getAttribute('aria-label') || b.textContent || ''),
    );
    sortBtn?.click();
  });
  await sleep(800);

  await page.evaluate(() => {
    const option = Array.from(document.querySelectorAll('div[role="menuitemradio"], div[role="menuitem"]')).find((el) =>
      /m[aá]s reciente|most recent|newest/i.test(el.textContent || ''),
    );
    option?.click();
  });

  await sleep(2500);

  await page.evaluate(async () => {
    const scrollables = Array.from(document.querySelectorAll('div[role="main"], div.m6QErb'));
    for (const el of scrollables) {
      for (let i = 0; i < 12; i += 1) {
        el.scrollTop += 700;
        await new Promise((r) => setTimeout(r, 300));
      }
    }
  });

  await sleep(1500);

  const rawReviews = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('[data-review-id], div.jftiEf'));
    const seen = new Set();

    return cards
      .map((card) => {
        const name = card.querySelector('.d4r55')?.textContent?.trim() || '';
        const quote = card.querySelector('.wiI7pd')?.textContent?.trim() || '';
        const image = card.querySelector('img[src*="googleusercontent"]')?.src || '';
        const date = card.querySelector('.rsqaWe')?.textContent?.trim() || '';
        const aria =
          card.querySelector('[aria-label*="estrellas"], [aria-label*="stars"]')?.getAttribute('aria-label') || '';
        const ratingMatch = aria.match(/(\d)/);
        const rating = ratingMatch ? Number(ratingMatch[1]) : null;
        const key = `${name}::${quote.slice(0, 60)}`;
        if (!name || !quote || seen.has(key)) return null;
        seen.add(key);
        return { name, quote, image, date, rating };
      })
      .filter(Boolean);
  });

  const fiveStarRecent = rawReviews
    .filter((review) => review.rating === 5)
    .sort((a, b) => parseRelativeDate(a.date) - parseRelativeDate(b.date))
    .slice(0, MAX_REVIEWS)
    .map((review) => ({
      author: review.name,
      quote: review.quote,
      date: review.date,
      image: toAvatarUrl(review.image),
      source: 'Google Maps',
    }));

  writeFileSync(
    new URL('../src/data/googleReviews.js', import.meta.url),
    `export const GOOGLE_REVIEWS_SOURCE = ${JSON.stringify(SOURCE_URL, null, 2)};

export const GOOGLE_REVIEWS_UPDATED_AT = ${JSON.stringify(new Date().toISOString(), null, 2)};

export const googleReviews = ${JSON.stringify(fiveStarRecent, null, 2)};
`,
  );

  console.log(JSON.stringify({ count: fiveStarRecent.length, reviews: fiveStarRecent }, null, 2));
} finally {
  await browser.close();
}
