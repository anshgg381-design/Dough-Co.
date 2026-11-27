import type { StaticImageData } from 'next/image';

import logoBadge from '@/public/assets/aistudio/images_6acbbc21.jpeg';
import storefront from '@/public/assets/aistudio/unnamed_e566e6b1.webp';
import interiorBar from '@/public/assets/aistudio/unnamed__1__b2fb7931.webp';
import diningCorner from '@/public/assets/aistudio/unnamed__2__3113b3a6.webp';
import tableSetting from '@/public/assets/aistudio/unnamed__3__fae16493.webp';
import heroTakeaway from '@/public/assets/aistudio/imgi_33_858088570_17949135600347467_3931433580537218318_n_50fca20d.jpg';

import heroPizza from '@/public/images/zomato/zomato-cover.jpeg';
import burrataSalad from '@/public/images/zomato/burrata-and-rocket-salad.jpeg';
import caesarSalad from '@/public/images/zomato/classic-caesar-salad.jpeg';
import portobelloFries from '@/public/images/zomato/signature-portobello-fries.jpeg';
import ratatouilleCigars from '@/public/images/zomato/ratatouille-cigars.jpeg';
import classicFries from '@/public/images/zomato/classic-fries.jpeg';
import cajunChickenPopcorn from '@/public/images/zomato/cajun-chicken-popcorn.jpeg';
import wildMushroomArancini from '@/public/images/zomato/wild-mushroom-arancini.jpeg';
import chickenArancini from '@/public/images/zomato/chicken-arancini.jpeg';
import penneAlfredo from '@/public/images/zomato/penne-alfredo-pasta.jpg';
import truffleMushroomSpaghetti from '@/public/images/zomato/truffle-wild-mushroom-spaghetti-pasta.jpg';
import chickenBolognese from '@/public/images/zomato/chicken-bolognese-pasta.jpeg';

export const siteImages = {
  logoBadge,
  heroTakeaway,
  heroPizza,
  storefront,
  interiorBar,
  diningCorner,
  tableSetting,
  ratatouilleCigars,
  portobelloFries,
  burrataSalad,
  truffleMushroomSpaghetti,
} as const;

export const menuImagesByPath: Record<string, StaticImageData> = {
  '/images/zomato/burrata-and-rocket-salad.jpeg': burrataSalad,
  '/images/zomato/classic-caesar-salad.jpeg': caesarSalad,
  '/images/zomato/signature-portobello-fries.jpeg': portobelloFries,
  '/images/zomato/ratatouille-cigars.jpeg': ratatouilleCigars,
  '/images/zomato/classic-fries.jpeg': classicFries,
  '/images/zomato/cajun-chicken-popcorn.jpeg': cajunChickenPopcorn,
  '/images/zomato/wild-mushroom-arancini.jpeg': wildMushroomArancini,
  '/images/zomato/chicken-arancini.jpeg': chickenArancini,
  '/images/zomato/penne-alfredo-pasta.jpg': penneAlfredo,
  '/images/zomato/truffle-wild-mushroom-spaghetti-pasta.jpg': truffleMushroomSpaghetti,
  '/images/zomato/chicken-bolognese-pasta.jpeg': chickenBolognese,
};
