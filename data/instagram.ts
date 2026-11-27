import { siteConfig } from '@/data/siteConfig';

export interface InstagramPost {
  id: string;
  caption: string;
  mediaUrl: string;
  permalink: string;
  timestamp: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  likesCount?: number;
  commentsCount?: number;
  location?: string;
  shortDate: string;
}

export const FALLBACK_INSTAGRAM_POSTS: readonly InstagramPost[] = [
  {
    id: 'ig-takeaway-stack',
    caption:
      'Take the good stuff with you. Fresh wood-fired pizzas, tacos and cold drinks boxed for your gatherings in Panipat.',
    mediaUrl:
      '/assets/aistudio/imgi_33_858088570_17949135600347467_3931433580537218318_n_50fca20d.jpg',
    permalink: siteConfig.links.instagram,
    timestamp: '2026-11-26T14:30:00Z',
    mediaType: 'IMAGE',
    likesCount: 184,
    commentsCount: 12,
    location: 'Model Town, Panipat',
    shortDate: '2d ago',
  },
  {
    id: 'ig-napoli-pizza',
    caption:
      '48-hour fermented dough, plum tomatoes and fresh basil blistered at high heat. Queen Margherita straight out of the oven.',
    mediaUrl: '/images/zomato/zomato-cover.jpeg',
    permalink: siteConfig.links.instagram,
    timestamp: '2026-11-24T18:00:00Z',
    mediaType: 'IMAGE',
    likesCount: 226,
    commentsCount: 19,
    location: 'Dough & Co.',
    shortDate: '4d ago',
  },
  {
    id: 'ig-truffle-spaghetti',
    caption:
      'Truffle wild mushroom spaghetti with freshly toasted garlic bread. Rich, earthy and cooked to order on our mezzanine.',
    mediaUrl: '/images/zomato/truffle-wild-mushroom-spaghetti-pasta.jpg',
    permalink: siteConfig.links.instagram,
    timestamp: '2026-11-22T13:15:00Z',
    mediaType: 'IMAGE',
    likesCount: 195,
    commentsCount: 14,
    location: 'Mezzanine Dining',
    shortDate: '6d ago',
  },
  {
    id: 'ig-coffee-bar',
    caption:
      'Quiet afternoon at the espresso bar. Iced lattes, cold brews and single-origin shots poured all day next to IDFC Bank.',
    mediaUrl: '/assets/aistudio/unnamed__1__b2fb7931.webp',
    permalink: siteConfig.links.instagram,
    timestamp: '2026-11-20T09:45:00Z',
    mediaType: 'IMAGE',
    likesCount: 142,
    commentsCount: 8,
    location: 'Coffee Bar',
    shortDate: '1w ago',
  },
  {
    id: 'ig-burrata-salad',
    caption:
      'Whole burrata, peppery wild rocket, slow-cooked tomato jam and basil oil. A crisp plate to begin your table dinner.',
    mediaUrl: '/images/zomato/burrata-and-rocket-salad.jpeg',
    permalink: siteConfig.links.instagram,
    timestamp: '2026-11-18T19:30:00Z',
    mediaType: 'IMAGE',
    likesCount: 168,
    commentsCount: 11,
    location: 'Model Town, Panipat',
    shortDate: '1w ago',
  },
  {
    id: 'ig-table-dinner',
    caption:
      'Pizzas, Mexican tacos, and house chilli oils ready for evening service. Open until 11:00 PM Mon–Thu and 12:00 AM on weekends.',
    mediaUrl: '/assets/aistudio/unnamed__3__fae16493.webp',
    permalink: siteConfig.links.instagram,
    timestamp: '2026-11-15T20:00:00Z',
    mediaType: 'IMAGE',
    likesCount: 210,
    commentsCount: 15,
    location: 'Dough & Co.',
    shortDate: '2w ago',
  },
] as const;
