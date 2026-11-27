import { MENU_ITEMS, type MenuItem } from '@/data/menu';

export type PairingMood =
  | 'all'
  | 'classics'
  | 'spiced'
  | 'creamy'
  | 'refreshing';

export interface PairingMoodTab {
  id: PairingMood;
  label: string;
}

export interface PairingEntry {
  id: string;
  mood: Exclude<PairingMood, 'all'>;
  foodId: string;
  drinkId: string;
  headline: string;
  note: string;
}

export interface ResolvedPairing extends PairingEntry {
  food: MenuItem;
  drink: MenuItem;
  combinedPrice: number;
  isVegFriendly: boolean;
}

export const PAIRING_MOODS: readonly PairingMoodTab[] = [
  { id: 'all', label: 'All pairings' },
  { id: 'classics', label: 'Wood-Fired Classics' },
  { id: 'spiced', label: 'Bold & Spiced' },
  { id: 'creamy', label: 'Rich & Earthy' },
  { id: 'refreshing', label: 'Refreshers & Shakes' },
] as const;

export const PAIRING_ENTRIES: readonly PairingEntry[] = [
  {
    id: 'margherita-espresso-tonic',
    mood: 'classics',
    foodId: 'queen-margherita',
    drinkId: 'espresso-tonic',
    headline: 'Bright citrus bitterness meets fresh basil & mozzarella',
    note: 'Tonic sparkle lifts the sweet San Marzano tomato marinara and keeps every slice light on the palate.',
  },
  {
    id: 'burrata-cold-brew',
    mood: 'classics',
    foodId: 'burrata-margherita-pizza',
    drinkId: 'three-fields-cold-brew',
    headline: 'Velvety burrata balanced by slow-steeped cold brew',
    note: 'Smooth chocolatey cold brew cuts gently across creamy stracciatella curds and wood-fired crust.',
  },
  {
    id: 'chipotle-paneer-hibiscus',
    mood: 'spiced',
    foodId: 'chipotle-paneer-pizza',
    drinkId: 'hibiscus-watermelon-mocktail',
    headline: 'Smoky chipotle heat cooled with crisp melon & hibiscus',
    note: 'Chilled botanical sweetness tames smoky chipotle paneer and briny black olives.',
  },
  {
    id: 'picante-olivia-cold-foam',
    mood: 'spiced',
    foodId: 'picante-olivia-pizza',
    drinkId: 'cold-brew-vanilla-cold-foam',
    headline: 'Hot honey drizzle alongside sweet vanilla cold foam',
    note: 'Creamy vanilla cold foam rounds out red paprika spice and caramelized hot-honey edges.',
  },
  {
    id: 'peri-peri-virgin-mojito',
    mood: 'spiced',
    foodId: 'peri-peri-pizza',
    drinkId: 'virgin-mojito',
    headline: 'Fiery peri-peri chicken refreshed with crushed mint & lime',
    note: 'Zesty citrus and cooling garden mint reset the palate between jalapeño-laced bites.',
  },
  {
    id: 'mushroom-mascarpone-flat-white',
    mood: 'creamy',
    foodId: 'mushroom-and-mascarpone-pizza',
    drinkId: 'flat-white',
    headline: 'Toasted mushroom savoriness & silky espresso micro-foam',
    note: 'Steamed milk and nutty espresso echo balsamic onions, exotic mushrooms, and mascarpone.',
  },
  {
    id: 'truffle-spaghetti-french-press',
    mood: 'creamy',
    foodId: 'truffle-wild-mushroom-spaghetti-pasta',
    drinkId: 'french-press-brewed-coffee',
    headline: 'Deep black roast poured alongside truffle wild mushrooms',
    note: 'Full-bodied French press coffee highlights earthy porcini aroma without masking delicate cheese.',
  },
  {
    id: 'pepperoni-peach-iced-tea',
    mood: 'refreshing',
    foodId: 'chicken-pepperoni-pizza',
    drinkId: 'peach-iced-tea',
    headline: 'Savory crisp pepperoni paired with chilled orchard peach tea',
    note: 'Clean stone-fruit acidity offsets rich mozzarella and spiced chicken pepperoni slices.',
  },
  {
    id: 'pesto-verde-tiramisu-shake',
    mood: 'refreshing',
    foodId: 'pesto-verde-pizza',
    drinkId: 'tiramisu-shake',
    headline: 'Sun-dried tomato & pesto pie followed by cold coffee cream',
    note: 'Herbal basil pesto transitions naturally into a sweet espresso-tiramisu shake finish.',
  },
] as const;

const MENU_BY_ID: Record<string, MenuItem> = Object.fromEntries(
  MENU_ITEMS.map((item) => [item.id, item])
);

export function getResolvedPairings(): ResolvedPairing[] {
  return PAIRING_ENTRIES.flatMap((entry) => {
    const food = MENU_BY_ID[entry.foodId];
    const drink = MENU_BY_ID[entry.drinkId];
    if (!food || !drink) {
      return [];
    }
    return [
      {
        ...entry,
        food,
        drink,
        combinedPrice: food.price + drink.price,
        isVegFriendly: food.dietary === 'veg' && drink.dietary === 'veg',
      },
    ];
  });
}

export function filterPairings(
  pairings: readonly ResolvedPairing[],
  mood: PairingMood,
  vegOnly: boolean
): ResolvedPairing[] {
  return pairings.filter((pairing) => {
    if (mood !== 'all' && pairing.mood !== mood) return false;
    if (vegOnly && !pairing.isVegFriendly) return false;
    return true;
  });
}
