import test from 'node:test';
import assert from 'node:assert/strict';
import { siteConfig, buildRestaurantJsonLd } from '@/data/siteConfig';
import { MENU_ITEMS, MENU_CATEGORIES, PIZZA_ITEMS } from '@/data/menu';
import { CUSTOMER_REVIEWS } from '@/data/reviews';
import { FALLBACK_INSTAGRAM_POSTS } from '@/data/instagram';
import {
  getLiveOpenStatus,
  generateReservationTimeSlots,
  validateReserveForm,
  buildWhatsAppReserveUrl,
} from '@/lib/hours';
import fs from 'node:fs';
import path from 'node:path';
import {
  filterMenuItems,
  groupMenuBySubCategory,
  formatINR,
  getFeaturedDishesWithImages,
  parseMenuCategoryParam,
} from '@/lib/menu-utils';

const BANNED_WORDS = [
  'crafted',
  'handcrafted',
  'curated',
  'elevated',
  'experience',
  'journey',
  'passion',
  'nestled',
  'game-changer',
];

test('menu keeps all 141 items and 20 pizzas with positive INR prices', () => {
  assert.equal(MENU_ITEMS.length, 141);
  assert.equal(PIZZA_ITEMS.length, 20);
  for (const item of MENU_ITEMS) {
    assert.ok(item.price > 0, `Expected positive price for ${item.name}`);
    assert.ok(item.name.trim().length > 0);
  }
  const buffalo = MENU_ITEMS.find((i) => i.id === 'buffalo-margherita-pizza');
  assert.equal(buffalo?.dietary, 'veg');
});

test('siteConfig, reviews, instagram, and menu contain no banned words or removed claims', () => {
  const textBlob = JSON.stringify({
    siteConfig,
    CUSTOMER_REVIEWS,
    FALLBACK_INSTAGRAM_POSTS,
    MENU_CATEGORIES,
    MENU_ITEMS,
  }).toLowerCase();

  for (const word of BANNED_WORDS) {
    assert.equal(
      textBlob.includes(word),
      false,
      `Found banned word "${word}" in data`
    );
  }

  assert.equal(textBlob.includes('800 for two'), false);
  assert.equal(textBlob.includes('21 delivery reviews'), false);
});

test('customer reviews contain 4 Google reviews with valid ratings and photos', () => {
  assert.equal(CUSTOMER_REVIEWS.length, 4);
  for (const review of CUSTOMER_REVIEWS) {
    assert.equal(review.source, 'Google');
    assert.ok(review.rating >= 1 && review.rating <= 5);
    assert.ok(review.author.trim().length > 0);
    assert.ok(review.quote.trim().length > 20);
    assert.ok(review.photoKey.length > 0);
  }
});

test('instagram feed contains valid posts with existing local image files', () => {
  assert.equal(FALLBACK_INSTAGRAM_POSTS.length, 6);
  for (const post of FALLBACK_INSTAGRAM_POSTS) {
    assert.ok(post.id.trim().length > 0);
    assert.ok(post.caption.trim().length > 10);
    assert.ok(post.mediaUrl.trim().length > 0);
    assert.ok(post.permalink.startsWith('https://www.instagram.com'));
    assert.ok(post.shortDate.trim().length > 0);

    if (post.mediaUrl.startsWith('/')) {
      const filePath = path.join(process.cwd(), 'public', post.mediaUrl);
      assert.equal(
        fs.existsSync(filePath),
        true,
        `Missing Instagram photo file on disk: ${filePath}`
      );
    }
  }
});

test('Restaurant JSON-LD matches siteConfig facts', () => {
  const ld = buildRestaurantJsonLd();
  assert.equal(ld['@type'], 'Restaurant');
  assert.equal(ld.name, 'Dough & Co.');
  assert.equal(ld.telephone, '+91 90508 10270');
  assert.equal(ld.address.postalCode, '132103');
  assert.equal(ld.openingHoursSpecification.length, 2);
});

test('Asia/Kolkata open/closed status respects Mon-Thu (12 PM - 11 PM) and Fri-Sun (12 PM - 12 AM)', () => {
  // Monday 2026-11-30 11:30 IST = 06:00 UTC -> Closed
  const monBeforeOpen = getLiveOpenStatus(new Date('2026-11-30T06:00:00Z'));
  assert.equal(monBeforeOpen.isOpen, false);
  assert.equal(monBeforeOpen.todayGroup, 'weekday');
  assert.equal(monBeforeOpen.label, 'Closed · opens at 12:00 PM');

  // Monday 2026-11-30 19:30 IST = 14:00 UTC -> Open until 11:00 PM
  const monEvening = getLiveOpenStatus(new Date('2026-11-30T14:00:00Z'));
  assert.equal(monEvening.isOpen, true);
  assert.equal(monEvening.label, 'Open now · until 11:00 PM');

  // Monday 2026-11-30 23:05 IST = 17:35 UTC -> Closed
  const monAfterClose = getLiveOpenStatus(new Date('2026-11-30T17:35:00Z'));
  assert.equal(monAfterClose.isOpen, false);

  // Friday 2026-12-04 23:30 IST = 18:00 UTC -> Open until 12:00 AM
  const friLate = getLiveOpenStatus(new Date('2026-12-04T18:00:00Z'));
  assert.equal(friLate.isOpen, true);
  assert.equal(friLate.todayGroup, 'weekend');
  assert.equal(friLate.label, 'Open now · until 12:00 AM');
});

test('reservation time slots stop at least 60 minutes before closing', () => {
  // 2026-11-30 is Monday (closes 11:00 PM -> last slot 10:00 PM)
  const monSlots = generateReservationTimeSlots('2026-11-30');
  assert.equal(monSlots[0], '12:00 PM');
  assert.equal(monSlots[monSlots.length - 1], '10:00 PM');
  assert.equal(monSlots.includes('10:30 PM'), false);

  // 2026-12-04 is Friday (closes 12:00 AM -> last slot 11:00 PM)
  const friSlots = generateReservationTimeSlots('2026-12-04');
  assert.equal(friSlots[0], '12:00 PM');
  assert.equal(friSlots[friSlots.length - 1], '11:00 PM');
  assert.equal(friSlots.includes('11:30 PM'), false);
});

test('reservation validation rejects missing inputs and builds WhatsApp URL for valid input', () => {
  const emptyErrors = validateReserveForm({
    name: '',
    date: '',
    time: '',
    guests: '',
  });
  assert.ok(emptyErrors.name);
  assert.ok(emptyErrors.date);
  assert.ok(emptyErrors.time);
  assert.ok(emptyErrors.guests);

  const validValues = {
    name: 'Aarav Sharma',
    date: '2026-12-04',
    time: '8:00 PM',
    guests: '4',
  };
  assert.deepEqual(validateReserveForm(validValues), {});

  const url = buildWhatsAppReserveUrl(validValues);
  assert.ok(url.startsWith('https://wa.me/919050810270?text='));
  assert.ok(decodeURIComponent(url).includes('Aarav Sharma'));
  assert.ok(decodeURIComponent(url).includes('8:00 PM'));
});

test('menu filtering and subgrouping work across category, dietary, and query', () => {
  const all = filterMenuItems(MENU_ITEMS, {
    category: 'all',
    dietary: 'all',
    query: '',
  });
  assert.equal(all.length, 141);

  const vegPizzas = filterMenuItems(MENU_ITEMS, {
    category: 'pizzas',
    dietary: 'veg',
    query: '',
  });
  assert.ok(vegPizzas.length > 0);
  assert.ok(vegPizzas.every((i) => i.category === 'pizzas' && i.dietary === 'veg'));

  const burrata = filterMenuItems(MENU_ITEMS, {
    category: 'all',
    dietary: 'all',
    query: 'burrata',
  });
  assert.ok(burrata.length >= 2);

  const grouped = groupMenuBySubCategory(vegPizzas);
  assert.equal(grouped[0]?.subCategory, 'Veg Pizza');
  assert.equal(formatINR(594), '₹594');
});

test('featured homepage dishes strictly contain real local images and valid prices', () => {
  const featured = getFeaturedDishesWithImages(MENU_ITEMS);
  assert.equal(featured.length, 6);
  for (const dish of featured) {
    assert.ok(dish.image, `Expected image on featured dish ${dish.name}`);
    const filePath = path.join(process.cwd(), 'public', dish.image);
    assert.equal(
      fs.existsSync(filePath),
      true,
      `Missing photo file on disk for ${dish.name}: ${filePath}`
    );
    assert.ok(dish.price > 0);
  }
});

test('parseMenuCategoryParam accepts valid categories and defaults invalid input to all', () => {
  assert.equal(parseMenuCategoryParam('pizzas'), 'pizzas');
  assert.equal(parseMenuCategoryParam('tacos'), 'tacos');
  assert.equal(parseMenuCategoryParam('drinks'), 'drinks');
  assert.equal(parseMenuCategoryParam(['pastas']), 'pastas');
  assert.equal(parseMenuCategoryParam('unknown'), 'all');
  assert.equal(parseMenuCategoryParam(undefined), 'all');
});
