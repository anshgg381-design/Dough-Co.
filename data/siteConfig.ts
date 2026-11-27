export interface HoursWindow {
  id: 'weekday' | 'weekend';
  days: string;
  openHour: number;
  openMinute: number;
  /** Closing hour in 24h time; 24 represents 12:00 AM (midnight). */
  closeHour: number;
  closeMinute: number;
  display: string;
  closeDisplay: string;
  openDisplay: string;
  schemaDays: readonly string[];
  opens: string;
  closes: string;
}

export const siteConfig = {
  name: 'Dough & Co.',
  descriptor: 'Pizzeria, taqueria and coffee bar',
  address: {
    line1: '230-R, Ground Floor, next to IDFC Bank',
    line2: 'Near Ram Lal Chowk, Model Town, Panipat, Haryana 132103',
    full: '230-R, Ground Floor, next to IDFC Bank, near Ram Lal Chowk, Model Town, Panipat, Haryana 132103',
    oneLine: '230-R, Ground Floor, next to IDFC Bank, Model Town, Panipat',
    streetAddress:
      '230-R, Ground Floor, next to IDFC Bank, near Ram Lal Chowk, Model Town',
    city: 'Panipat',
    state: 'Haryana',
    postalCode: '132103',
    country: 'IN',
  },
  phone: {
    display: '+91 90508 10270',
    href: 'tel:+919050810270',
    whatsappNumber: '919050810270',
  },
  instagram: {
    handle: '@doughandco_india',
    url: 'https://www.instagram.com/doughandco_india/?hl=en',
  },
  links: {
    maps: 'https://share.google/Fdg0BCh6dNpIWOQpK',
    zomato: 'https://www.zomato.com/panipat/dough-co-model-town/order',
    instagram: 'https://www.instagram.com/doughandco_india/?hl=en',
  },
  hours: {
    timeZone: 'Asia/Kolkata',
    schedule: [
      {
        id: 'weekday',
        days: 'Mon–Thu',
        openHour: 12,
        openMinute: 0,
        closeHour: 23,
        closeMinute: 0,
        display: '12:00 PM–11:00 PM',
        openDisplay: '12:00 PM',
        closeDisplay: '11:00 PM',
        schemaDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '12:00',
        closes: '23:00',
      },
      {
        id: 'weekend',
        days: 'Fri–Sun',
        openHour: 12,
        openMinute: 0,
        closeHour: 24,
        closeMinute: 0,
        display: '12:00 PM–12:00 AM',
        openDisplay: '12:00 PM',
        closeDisplay: '12:00 AM',
        schemaDays: ['Friday', 'Saturday', 'Sunday'],
        opens: '12:00',
        closes: '00:00',
      },
    ] as readonly HoursWindow[],
  },
  navLinks: [
    { label: 'Menu', href: '/menu' },
    { label: 'Half & Half', href: '#half-and-half' },
    { label: 'Our space', href: '#our-space' },
    { label: 'Visit', href: '#visit' },
  ] as const,
  seo: {
    title: 'Dough & Co. — Pizzeria, Taqueria and Coffee Bar | Model Town, Panipat',
    description:
      'Dough & Co. is a pizzeria, taqueria and coffee bar at 230-R, Ground Floor, next to IDFC Bank, near Ram Lal Chowk, Model Town, Panipat.',
    menuTitle: 'Menu — Dough & Co. | Model Town, Panipat',
    menuDescription:
      'Full menu and prices for Dough & Co. in Model Town, Panipat — pizzas, tacos, pasta, small plates, burgers, coffee and drinks.',
  },
} as const;

export function buildRestaurantJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: siteConfig.name,
    description: `${siteConfig.name} — ${siteConfig.descriptor} in Model Town, Panipat.`,
    telephone: siteConfig.phone.display,
    priceRange: '₹₹',
    servesCuisine: ['Italian', 'Pizza', 'Mexican', 'Cafe'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    openingHoursSpecification: siteConfig.hours.schedule.map((row) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [...row.schemaDays],
      opens: row.opens,
      closes: row.closes,
    })),
    sameAs: [siteConfig.links.instagram, siteConfig.links.zomato],
    hasMap: siteConfig.links.maps,
    acceptsReservations: true,
  };
}
