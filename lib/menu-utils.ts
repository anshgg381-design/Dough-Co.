import type { DietaryType, MenuCategory, MenuItem } from '@/data/menu';

export type DietaryFilter = 'all' | 'veg' | 'non-veg';

export interface MenuFilterState {
  category: 'all' | MenuCategory;
  dietary: DietaryFilter;
  query: string;
}

export interface MenuSubGroup {
  subCategory: string;
  items: MenuItem[];
}

export function formatINR(amount: number): string {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}

export function matchesDietaryFilter(
  dietary: DietaryType,
  filter: DietaryFilter
): boolean {
  if (filter === 'all') return true;
  if (filter === 'veg') return dietary === 'veg';
  return dietary === 'non-veg' || dietary === 'egg';
}

export function filterMenuItems(
  items: readonly MenuItem[],
  state: MenuFilterState
): MenuItem[] {
  const normalizedQuery = state.query.trim().toLowerCase();

  return items.filter((item) => {
    if (state.category !== 'all' && item.category !== state.category) {
      return false;
    }

    if (!matchesDietaryFilter(item.dietary, state.dietary)) {
      return false;
    }

    if (normalizedQuery.length > 0) {
      const searchable = `${item.name} ${item.description} ${item.subCategory} ${item.categoryLabel}`.toLowerCase();
      if (!searchable.includes(normalizedQuery)) {
        return false;
      }
    }

    return true;
  });
}

export function groupMenuBySubCategory(items: readonly MenuItem[]): MenuSubGroup[] {
  const order: string[] = [];
  const map = new Map<string, MenuItem[]>();

  for (const item of items) {
    const existing = map.get(item.subCategory);
    if (existing) {
      existing.push(item);
    } else {
      order.push(item.subCategory);
      map.set(item.subCategory, [item]);
    }
  }

  return order.map((subCategory) => ({
    subCategory,
    items: map.get(subCategory) ?? [],
  }));
}

export const FEATURED_DISH_IDS = [
  'burrata-and-rocket-salad',
  'chicken-bolognese-pasta',
  'signature-portobello-fries',
  'penne-alfredo-pasta',
  'wild-mushroom-arancini',
  'cajun-chicken-popcorn',
] as const;

export function getFeaturedDishesWithImages(
  items: readonly MenuItem[]
): MenuItem[] {
  const byId = new Map(items.map((item) => [item.id, item]));
  const featured: MenuItem[] = [];

  for (const id of FEATURED_DISH_IDS) {
    const match = byId.get(id);
    if (match && match.image) {
      featured.push(match);
    }
  }

  return featured;
}

const VALID_CATEGORIES = new Set<string>([
  'all',
  'pizzas',
  'tacos',
  'pastas',
  'plates',
  'burgers',
  'drinks',
]);

export function parseMenuCategoryParam(
  value: string | string[] | undefined
): 'all' | MenuCategory {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw && VALID_CATEGORIES.has(raw)) {
    return raw as 'all' | MenuCategory;
  }
  return 'all';
}
