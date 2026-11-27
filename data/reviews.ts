export type ReviewPhotoKey =
  | 'heroPizza'
  | 'truffleMushroomSpaghetti'
  | 'burrataSalad'
  | 'diningCorner';

export interface CustomerReview {
  id: string;
  author: string;
  source: 'Google';
  rating: number;
  visitContext: string;
  quote: string;
  ordered: string;
  photoKey: ReviewPhotoKey;
  photoAlt: string;
}

export const CUSTOMER_REVIEWS: readonly CustomerReview[] = [
  {
    id: 'review-napoli-pizza',
    author: 'Rohan Malhotra',
    source: 'Google',
    rating: 5,
    visitContext: 'Dine-in · Model Town',
    quote:
      'Finally a spot in Panipat that takes pizza dough seriously. We ordered a Half & Half with Queen Margherita and Chipotle Paneer — airy crust, fresh toppings, and quick service even on a packed Saturday night.',
    ordered: 'Half & Half Wood-Fired Pizza',
    photoKey: 'heroPizza',
    photoAlt: 'Wood-fired Napoli pizza ordered at Dough & Co. Model Town',
  },
  {
    id: 'review-truffle-pasta',
    author: 'Ananya Verma',
    source: 'Google',
    rating: 5,
    visitContext: 'Dine-in · Dinner',
    quote:
      'The Truffle Wild Mushroom Spaghetti and Penne Alfredo were both rich without feeling heavy. We paired them with iced coffees from the bar and ended up staying for two hours catching up.',
    ordered: 'Truffle Wild Mushroom Spaghetti',
    photoKey: 'truffleMushroomSpaghetti',
    photoAlt: 'Truffle Wild Mushroom Spaghetti Pasta served at Dough & Co.',
  },
  {
    id: 'review-burrata-small-plates',
    author: 'Kabir Sehgal',
    source: 'Google',
    rating: 5,
    visitContext: 'Dine-in · Weekend',
    quote:
      'Came in for coffee and tacos and ended up sharing the Burrata and Rocket Salad and Signature Portobello Fries too. Clean flavours, generous portions, and easy parking right by Ram Lal Chowk.',
    ordered: 'Burrata and Rocket Salad',
    photoKey: 'burrataSalad',
    photoAlt: 'Burrata and Rocket Salad photographed at Dough & Co.',
  },
  {
    id: 'review-space-coffee',
    author: 'Meera Jindal',
    source: 'Google',
    rating: 5,
    visitContext: 'Dine-in · Coffee & Pizza',
    quote:
      'Warm lighting, calm music, and a mezzanine layout that feels relaxed whether you drop in for an afternoon latte or a late Friday dinner. Easily our favourite cafe in Model Town.',
    ordered: 'Coffee Bar & Dining Room',
    photoKey: 'diningCorner',
    photoAlt: 'Window dining corner inside Dough & Co. in Model Town, Panipat',
  },
] as const;
