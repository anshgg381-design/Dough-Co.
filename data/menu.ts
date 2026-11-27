export type MenuCategory =
  | 'pizzas'
  | 'tacos'
  | 'pastas'
  | 'plates'
  | 'burgers'
  | 'drinks';

export type DietaryType = 'veg' | 'egg' | 'non-veg';

export interface MenuItem {
  id: string;
  zomatoId: string;
  name: string;
  category: MenuCategory;
  categoryLabel: string;
  subCategory: string;
  price: number;
  dietary: DietaryType;
  description: string;
  image?: string;
}

export const MENU_CATEGORIES: { id: 'all' | MenuCategory; label: string }[] = [
  {
    "id": "all",
    "label": "All"
  },
  {
    "id": "pizzas",
    "label": "Napoli Pizza"
  },
  {
    "id": "tacos",
    "label": "Tacos & Mexican"
  },
  {
    "id": "pastas",
    "label": "Pasta & Mains"
  },
  {
    "id": "plates",
    "label": "Small Plates & Breads"
  },
  {
    "id": "burgers",
    "label": "Burgers & Dolci"
  },
  {
    "id": "drinks",
    "label": "Coffee & Drinks"
  }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    "id": "tex-mex-quinoa-salad-bowl",
    "zomatoId": "ctl_819751814",
    "name": "Tex Mex Quinoa Salad Bowl",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Salads",
    "price": 354,
    "dietary": "veg",
    "description": "Quinoa, chargrilled pineapple, kidney beans, corn, cucumber, cherry tomatoes, avocado and jalapeno lime vinaigrette."
  },
  {
    "id": "burrata-and-rocket-salad",
    "zomatoId": "ctl_819751762",
    "name": "Burrata and Rocket Salad",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Salads",
    "price": 438,
    "dietary": "veg",
    "description": "Fresh burrata, rocket leaves, tomato jam and basil pesto.",
    "image": "/images/zomato/burrata-and-rocket-salad.jpeg"
  },
  {
    "id": "classic-caesar-salad",
    "zomatoId": "ctl_819751813",
    "name": "Classic Caesar Salad",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Salads",
    "price": 294,
    "dietary": "veg",
    "description": "(Veg Preparation) Crisp assorted lettuce, house caesar dressing, herbed croutons, fresh veggies and Parmesan cheese.",
    "image": "/images/zomato/classic-caesar-salad.jpeg"
  },
  {
    "id": "creamy-scrambled-egg-toast",
    "zomatoId": "ctl_819751766",
    "name": "Creamy Scrambled Egg Toast",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Artisan Toasties & Bruschetta",
    "price": 258,
    "dietary": "egg",
    "description": "Sourdough bread and scrambled eggs."
  },
  {
    "id": "classic-bruschetta",
    "zomatoId": "ctl_819751773",
    "name": "Classic Bruschetta",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Artisan Toasties & Bruschetta",
    "price": 294,
    "dietary": "veg",
    "description": "Toasted bread topped with fresh tomatoes, basil, garlic and extra virgin olive oil."
  },
  {
    "id": "guacamole-toast",
    "zomatoId": "ctl_819751808",
    "name": "Guacamole Toast",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Artisan Toasties & Bruschetta",
    "price": 318,
    "dietary": "veg",
    "description": "Sourdough, cream cheese spread, smashed avocado, fresh cilantro and lime on butter toasted bread."
  },
  {
    "id": "confit-garlic-mushroom-toast",
    "zomatoId": "ctl_819751821",
    "name": "Confit Garlic Mushroom Toast",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Artisan Toasties & Bruschetta",
    "price": 318,
    "dietary": "veg",
    "description": "Sourdough toasted bread topped with creamy mushrooms, confit garlic and paprika chilli slices."
  },
  {
    "id": "signature-portobello-fries",
    "zomatoId": "ctl_819751860",
    "name": "Signature Portobello Fries",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Small Plates",
    "price": 474,
    "dietary": "veg",
    "description": "Crispy fried portobello sticks paired with garlic aioli.",
    "image": "/images/zomato/signature-portobello-fries.jpeg"
  },
  {
    "id": "loaded-nachos-grande",
    "zomatoId": "ctl_819751818",
    "name": "Loaded Nachos Grande",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Small Plates",
    "price": 474,
    "dietary": "veg",
    "description": "(Veg preparation) Crispy nachos layered with baked beans, salsa, cheese, fajita veggies, jalapeno mayo, guacamole and sour cream."
  },
  {
    "id": "chilaquiles-verde",
    "zomatoId": "ctl_819751861",
    "name": "Chilaquiles Verde",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Small Plates",
    "price": 438,
    "dietary": "veg",
    "description": "Crispy tortillas soaked in salsa roja, guacamole and Feta crumble."
  },
  {
    "id": "ratatouille-cigars",
    "zomatoId": "ctl_819751793",
    "name": "Ratatouille Cigars",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Small Plates",
    "price": 294,
    "dietary": "veg",
    "description": "Crispy cigar rolls filled with ratatouille. Served with creamy garlic aioli.",
    "image": "/images/zomato/ratatouille-cigars.jpeg"
  },
  {
    "id": "classic-fries",
    "zomatoId": "ctl_819751842",
    "name": "Classic Fries",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Small Plates",
    "price": 198,
    "dietary": "veg",
    "description": "",
    "image": "/images/zomato/classic-fries.jpeg"
  },
  {
    "id": "peri-peri-fries",
    "zomatoId": "ctl_819751794",
    "name": "Peri Peri Fries",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Small Plates",
    "price": 222,
    "dietary": "veg",
    "description": ""
  },
  {
    "id": "truffle-parmesan-fries",
    "zomatoId": "ctl_819751788",
    "name": "Truffle Parmesan Fries",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Small Plates",
    "price": 258,
    "dietary": "veg",
    "description": ""
  },
  {
    "id": "cajun-chicken-popcorn",
    "zomatoId": "ctl_819751756",
    "name": "Cajun Chicken Popcorn",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Small Plates",
    "price": 342,
    "dietary": "non-veg",
    "description": "Crispy fried chicken chunks tossed in cajun spice. Served with garlic aioli.",
    "image": "/images/zomato/cajun-chicken-popcorn.jpeg"
  },
  {
    "id": "wild-mushroom-arancini",
    "zomatoId": "ctl_819751791",
    "name": "Wild Mushroom Arancini",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Small Plates",
    "price": 306,
    "dietary": "veg",
    "description": "Crispy risotto balls with exotic mushrooms, butter and cheese. Served with marinara sauce.",
    "image": "/images/zomato/wild-mushroom-arancini.jpeg"
  },
  {
    "id": "parmesan-wings",
    "zomatoId": "ctl_819751792",
    "name": "Parmesan Wings",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Small Plates",
    "price": 414,
    "dietary": "non-veg",
    "description": "Woodfired baked wings tossed in creamy Parmesan sauce."
  },
  {
    "id": "chilaquiles-roja",
    "zomatoId": "ctl_819751807",
    "name": "Chilaquiles Roja",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Small Plates",
    "price": 414,
    "dietary": "egg",
    "description": "Crispy tortillas soaked in salsa roja and sunny side up egg."
  },
  {
    "id": "hot-sauce-wings",
    "zomatoId": "ctl_819751836",
    "name": "Hot Sauce Wings",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Small Plates",
    "price": 354,
    "dietary": "non-veg",
    "description": "Crispy baked chicken wings tossed in sriracha sauce."
  },
  {
    "id": "chicken-arancini",
    "zomatoId": "ctl_819751837",
    "name": "Chicken Arancini",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Small Plates",
    "price": 294,
    "dietary": "non-veg",
    "description": "Crispy risotto balls stuffed with pulled chicken and cheese. Served with marinara sauce.",
    "image": "/images/zomato/chicken-arancini.jpeg"
  },
  {
    "id": "roasted-pepper-and-veggies",
    "zomatoId": "ctl_819751810",
    "name": "Roasted Pepper and Veggies",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Warm Focaccia Sandwiches",
    "price": 414,
    "dietary": "veg",
    "description": "Roasted red pepper, rocket leaves, basil pesto, cheese and romesco sauce. Served with potato wedges."
  },
  {
    "id": "mushroom-and-rocket-leaves",
    "zomatoId": "ctl_819751831",
    "name": "Mushroom and Rocket Leaves",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Warm Focaccia Sandwiches",
    "price": 438,
    "dietary": "veg",
    "description": "Creamy mushrooms and balsamic dressed rocket leaves on moist focaccia. Served with potato wedges."
  },
  {
    "id": "caprese-sandwich",
    "zomatoId": "ctl_819751840",
    "name": "Caprese Sandwich",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Warm Focaccia Sandwiches",
    "price": 438,
    "dietary": "veg",
    "description": "Warm focaccia, confit tomatoes, basil pesto, balsamic glaze and bocconcini. Served with potato wedges."
  },
  {
    "id": "chicken-caprese",
    "zomatoId": "ctl_819751832",
    "name": "Chicken Caprese",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Warm Focaccia Sandwiches",
    "price": 474,
    "dietary": "non-veg",
    "description": "Succulent grilled chicken, confit tomatoes, basil pesto, balsamic glaze and fresh Mozzarella. Served with potato wedges."
  },
  {
    "id": "queen-margherita",
    "zomatoId": "ctl_819751746",
    "name": "Queen Margherita",
    "category": "pizzas",
    "categoryLabel": "Napoli Pizza",
    "subCategory": "Veg Pizza",
    "price": 474,
    "dietary": "veg",
    "description": "Marinara sauce, fresh Mozzarella and basil leaves."
  },
  {
    "id": "buffalo-margherita-pizza",
    "zomatoId": "ctl_819751752",
    "name": "Buffalo Margherita Pizza",
    "category": "pizzas",
    "categoryLabel": "Napoli Pizza",
    "subCategory": "Veg Pizza",
    "price": 522,
    "dietary": "veg",
    "description": "Marinara sauce, bocconcini and basil leaves."
  },
  {
    "id": "napoli-art-pie-pizza",
    "zomatoId": "ctl_819751815",
    "name": "Napoli Art Pie Pizza",
    "category": "pizzas",
    "categoryLabel": "Napoli Pizza",
    "subCategory": "Veg Pizza",
    "price": 594,
    "dietary": "veg",
    "description": "A tricolor spin of margherita pizza with splash of bocconcini, pesto and marinara on top."
  },
  {
    "id": "tutta-verdure-pizza",
    "zomatoId": "ctl_819751864",
    "name": "Tutta Verdure Pizza",
    "category": "pizzas",
    "categoryLabel": "Napoli Pizza",
    "subCategory": "Veg Pizza",
    "price": 522,
    "dietary": "veg",
    "description": "Marinara sauce, Mozzarella cheese, roasted peppers, broccoli, zucchini, sauteed onion, chipotle pepper and mushroom."
  },
  {
    "id": "pesto-verde-pizza",
    "zomatoId": "ctl_819751816",
    "name": "Pesto Verde Pizza",
    "category": "pizzas",
    "categoryLabel": "Napoli Pizza",
    "subCategory": "Veg Pizza",
    "price": 558,
    "dietary": "veg",
    "description": "Basil pesto sauce, fresh Mozzarella, sundried tomato, roasted red pepper and paprika chilli."
  },
  {
    "id": "garlic-grove-pizza",
    "zomatoId": "ctl_819751753",
    "name": "Garlic Grove Pizza",
    "category": "pizzas",
    "categoryLabel": "Napoli Pizza",
    "subCategory": "Veg Pizza",
    "price": 594,
    "dietary": "veg",
    "description": "Garlic Feta cheese sauce, Mozzarella, mushroom and thyme."
  },
  {
    "id": "burrata-margherita-pizza",
    "zomatoId": "ctl_819751882",
    "name": "Burrata Margherita Pizza",
    "category": "pizzas",
    "categoryLabel": "Napoli Pizza",
    "subCategory": "Veg Pizza",
    "price": 774,
    "dietary": "veg",
    "description": "Marinara sauce, fresh Mozzarella and burrata and basil leaves."
  },
  {
    "id": "quattro-formaggi-pizza",
    "zomatoId": "ctl_819751733",
    "name": "Quattro Formaggi Pizza",
    "category": "pizzas",
    "categoryLabel": "Napoli Pizza",
    "subCategory": "Veg Pizza",
    "price": 618,
    "dietary": "veg",
    "description": "Marinara sauce, four cheese and bird eye chilli."
  },
  {
    "id": "tutta-speciaza-pizza",
    "zomatoId": "ctl_819751790",
    "name": "Tutta Speciaza Pizza",
    "category": "pizzas",
    "categoryLabel": "Napoli Pizza",
    "subCategory": "Veg Pizza",
    "price": 570,
    "dietary": "veg",
    "description": "Marinara, sweet corn, jalapeno, olives, green chilli and red paprika."
  },
  {
    "id": "picante-olivia-pizza",
    "zomatoId": "ctl_819751851",
    "name": "Picante Olivia Pizza",
    "category": "pizzas",
    "categoryLabel": "Napoli Pizza",
    "subCategory": "Veg Pizza",
    "price": 630,
    "dietary": "veg",
    "description": "Marinara, onion, bell pepper, olives, mushroom, red paprika and hot honey drizzle."
  },
  {
    "id": "mushroom-and-mascarpone-pizza",
    "zomatoId": "ctl_819751783",
    "name": "Mushroom and Mascarpone Pizza",
    "category": "pizzas",
    "categoryLabel": "Napoli Pizza",
    "subCategory": "Veg Pizza",
    "price": 654,
    "dietary": "veg",
    "description": "Exotic mushroom sauce, Mozzarella cheese, exotic mushrooms, bird eye chilli, balsamic onion and mascarpone cheese."
  },
  {
    "id": "sundried-tomato-and-rocket-leaves-pizza",
    "zomatoId": "ctl_819751817",
    "name": "Sundried Tomato and Rocket Leaves Pizza",
    "category": "pizzas",
    "categoryLabel": "Napoli Pizza",
    "subCategory": "Veg Pizza",
    "price": 582,
    "dietary": "veg",
    "description": "Pesto sauce, Mozzarella cheese, sundried tomato and rocket leaves salad with Feta cheese."
  },
  {
    "id": "chipotle-paneer-pizza",
    "zomatoId": "ctl_819751734",
    "name": "Chipotle Paneer Pizza",
    "category": "pizzas",
    "categoryLabel": "Napoli Pizza",
    "subCategory": "Veg Pizza",
    "price": 594,
    "dietary": "veg",
    "description": "Marinara sauce, Mozzarella cheese, sauteed onion, olives and chipotle marinated paneer."
  },
  {
    "id": "sriracha-paneer-pizza",
    "zomatoId": "ctl_819751779",
    "name": "Sriracha Paneer Pizza",
    "category": "pizzas",
    "categoryLabel": "Napoli Pizza",
    "subCategory": "Veg Pizza",
    "price": 558,
    "dietary": "veg",
    "description": "Paneer marinated in sriracha, sauteed onions, Mozzarella cheese and marinara."
  },
  {
    "id": "chicken-contadina-pizza",
    "zomatoId": "ctl_819751829",
    "name": "Chicken Contadina Pizza",
    "category": "pizzas",
    "categoryLabel": "Napoli Pizza",
    "subCategory": "Non Veg Pizza",
    "price": 618,
    "dietary": "non-veg",
    "description": "Marinara sauce, Mozzarella cheese, sauteed onion, chilli, roasted barbeque chicken, balsamic onion and mascarpone cheese."
  },
  {
    "id": "chipotle-chicken-pizza",
    "zomatoId": "ctl_819751772",
    "name": "Chipotle Chicken Pizza",
    "category": "pizzas",
    "categoryLabel": "Napoli Pizza",
    "subCategory": "Non Veg Pizza",
    "price": 594,
    "dietary": "non-veg",
    "description": "Marinara sauce, Mozzarella cheese, chipotle pepper, olives and roasted chicken."
  },
  {
    "id": "chicken-pepperoni-pizza",
    "zomatoId": "ctl_819751865",
    "name": "Chicken Pepperoni Pizza",
    "category": "pizzas",
    "categoryLabel": "Napoli Pizza",
    "subCategory": "Non Veg Pizza",
    "price": 570,
    "dietary": "non-veg",
    "description": "Marinara sauce, Mozzarella cheese and chicken pepperoni."
  },
  {
    "id": "pesto-pollo-verde-pizza",
    "zomatoId": "ctl_819751866",
    "name": "Pesto Pollo Verde Pizza",
    "category": "pizzas",
    "categoryLabel": "Napoli Pizza",
    "subCategory": "Non Veg Pizza",
    "price": 618,
    "dietary": "non-veg",
    "description": "Basil pesto, Mozzarella cheese, sauteed onion, roasted chicken, broccoli, sundried tomato and mascarpone cheese."
  },
  {
    "id": "sriracha-sizzle-pizza",
    "zomatoId": "ctl_819751755",
    "name": "Sriracha Sizzle Pizza",
    "category": "pizzas",
    "categoryLabel": "Napoli Pizza",
    "subCategory": "Non Veg Pizza",
    "price": 630,
    "dietary": "non-veg",
    "description": "Chicken marinated in sriracha, sauteed onions, Mozzarella cheese and marinara sauce."
  },
  {
    "id": "peri-peri-pizza",
    "zomatoId": "ctl_819751800",
    "name": "Peri Peri Pizza",
    "category": "pizzas",
    "categoryLabel": "Napoli Pizza",
    "subCategory": "Non Veg Pizza",
    "price": 654,
    "dietary": "non-veg",
    "description": "Chicken dipped in peri peri sauce, red paprika, jalapenos, marinara sauce and Mozzarella cheese."
  },
  {
    "id": "spaghetti-aglio-e-olio-pasta",
    "zomatoId": "ctl_825100259",
    "name": "Spaghetti Aglio e Olio Pasta",
    "category": "pastas",
    "categoryLabel": "Pasta & Mains",
    "subCategory": "Pasta and More",
    "price": 474,
    "dietary": "veg",
    "description": "Olive oil, garlic, cherry tomatoes, bird eye chilli and Parmesan cheese."
  },
  {
    "id": "penne-arrabiata-pasta",
    "zomatoId": "ctl_825100260",
    "name": "Penne Arrabiata Pasta",
    "category": "pastas",
    "categoryLabel": "Pasta & Mains",
    "subCategory": "Pasta and More",
    "price": 474,
    "dietary": "veg",
    "description": "Spicy tomato sauce with garlic, red chilli, basil and Parmesan cheese."
  },
  {
    "id": "penne-alla-vodka-pasta",
    "zomatoId": "ctl_825100261",
    "name": "Penne alla Vodka Pasta",
    "category": "pastas",
    "categoryLabel": "Pasta & Mains",
    "subCategory": "Pasta and More",
    "price": 510,
    "dietary": "veg",
    "description": "Rich tomato vodka sauce with herbs and Parmesan cheese."
  },
  {
    "id": "penne-alfredo-pasta",
    "zomatoId": "ctl_825100262",
    "name": "Penne Alfredo Pasta",
    "category": "pastas",
    "categoryLabel": "Pasta & Mains",
    "subCategory": "Pasta and More",
    "price": 474,
    "dietary": "veg",
    "description": "Cream, cheese sauce with mushrooms, broccoli and Parmesan.",
    "image": "/images/zomato/penne-alfredo-pasta.jpg"
  },
  {
    "id": "truffle-wild-mushroom-spaghetti-pasta",
    "zomatoId": "ctl_825100263",
    "name": "Truffle Wild Mushroom Spaghetti Pasta",
    "category": "pastas",
    "categoryLabel": "Pasta & Mains",
    "subCategory": "Pasta and More",
    "price": 522,
    "dietary": "veg",
    "description": "",
    "image": "/images/zomato/truffle-wild-mushroom-spaghetti-pasta.jpg"
  },
  {
    "id": "fettuccine-in-rose-sauce-pasta",
    "zomatoId": "ctl_825100264",
    "name": "Fettuccine in Rose Sauce Pasta",
    "category": "pastas",
    "categoryLabel": "Pasta & Mains",
    "subCategory": "Pasta and More",
    "price": 474,
    "dietary": "egg",
    "description": "Silky fettuccine tossed in creamy tomato rose sauce, finished with herbs and Parmesan."
  },
  {
    "id": "fettuccine-pesto-pasta",
    "zomatoId": "ctl_825100265",
    "name": "Fettuccine Pesto Pasta",
    "category": "pastas",
    "categoryLabel": "Pasta & Mains",
    "subCategory": "Pasta and More",
    "price": 522,
    "dietary": "egg",
    "description": "Fresh basil pesto with cherry tomatoes and Parmesan cheese."
  },
  {
    "id": "chicken-bolognese-pasta",
    "zomatoId": "ctl_825100258",
    "name": "Chicken Bolognese Pasta",
    "category": "pastas",
    "categoryLabel": "Pasta & Mains",
    "subCategory": "Pasta and More",
    "price": 535,
    "dietary": "non-veg",
    "description": "Rich tomato sauce with herbs, chilli, minced chicken and parmesan",
    "image": "/images/zomato/chicken-bolognese-pasta.jpeg"
  },
  {
    "id": "spinach-ricotta-ravioli",
    "zomatoId": "ctl_825153035",
    "name": "Spinach Ricotta Ravioli",
    "category": "pastas",
    "categoryLabel": "Pasta & Mains",
    "subCategory": "Pasta and More",
    "price": 475,
    "dietary": "veg",
    "description": "Handmade pasta filled with ricotta & spinach in butter emulsion sauce"
  },
  {
    "id": "smoked-chicken-ravioli",
    "zomatoId": "ctl_825153036",
    "name": "Smoked Chicken Ravioli",
    "category": "pastas",
    "categoryLabel": "Pasta & Mains",
    "subCategory": "Pasta and More",
    "price": 510,
    "dietary": "non-veg",
    "description": "Handmade pasta filled with chicken mousse in butter emulsion sauce"
  },
  {
    "id": "classic-lasagne",
    "zomatoId": "ctl_825153037",
    "name": "Classic Lasagne",
    "category": "pastas",
    "categoryLabel": "Pasta & Mains",
    "subCategory": "Pasta and More",
    "price": 510,
    "dietary": "veg",
    "description": "Layers of pasta filled with exotic veggies & cheese"
  },
  {
    "id": "pepperoni-stuffed-garlic-bread",
    "zomatoId": "ctl_819751748",
    "name": "Pepperoni Stuffed Garlic Bread",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Flat Breads",
    "price": 570,
    "dietary": "non-veg",
    "description": ""
  },
  {
    "id": "chicken-and-chilli-flatbread",
    "zomatoId": "ctl_819751758",
    "name": "Chicken and Chilli Flatbread",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Flat Breads",
    "price": 318,
    "dietary": "non-veg",
    "description": "Grilled chicken, green chilli, onion and Mozzarella."
  },
  {
    "id": "cheese-stuffed-garlic-bread",
    "zomatoId": "ctl_819751795",
    "name": "Cheese Stuffed Garlic Bread",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Flat Breads",
    "price": 570,
    "dietary": "veg",
    "description": ""
  },
  {
    "id": "jalapeno-and-corn-stuffed-garlic-bread",
    "zomatoId": "ctl_819751811",
    "name": "Jalapeno and Corn Stuffed Garlic Bread",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Flat Breads",
    "price": 570,
    "dietary": "veg",
    "description": ""
  },
  {
    "id": "pesto-burrata-flatbread",
    "zomatoId": "ctl_819751819",
    "name": "Pesto Burrata Flatbread",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Flat Breads",
    "price": 378,
    "dietary": "veg",
    "description": "Pesto, confit garlic, burrata, Mozzarella, cherry tomatoes."
  },
  {
    "id": "mushroom-and-chilli-flatbread",
    "zomatoId": "ctl_819751845",
    "name": "Mushroom and Chilli Flatbread",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Flat Breads",
    "price": 378,
    "dietary": "veg",
    "description": "Mushroom, green chilli, onion and Mozzarella."
  },
  {
    "id": "garlic-flatbread",
    "zomatoId": "ctl_819751880",
    "name": "Garlic Flatbread",
    "category": "plates",
    "categoryLabel": "Small Plates & Breads",
    "subCategory": "Flat Breads",
    "price": 354,
    "dietary": "veg",
    "description": "Woodfired flat garlic bread, infused with aromatic herbs and a buttery garlic spread."
  },
  {
    "id": "black-bean-and-cheese-tacos",
    "zomatoId": "ctl_819751763",
    "name": "Black Bean and Cheese Tacos",
    "category": "tacos",
    "categoryLabel": "Tacos & Mexican",
    "subCategory": "Soft Shell Tacos",
    "price": 294,
    "dietary": "veg",
    "description": "Tortilla, iceberg, baked beans, Cheddar cheese sauce, jalapeno mayo and pickled onion."
  },
  {
    "id": "crispy-paneer-chipotle-tacos",
    "zomatoId": "ctl_819751846",
    "name": "Crispy Paneer Chipotle Tacos",
    "category": "tacos",
    "categoryLabel": "Tacos & Mexican",
    "subCategory": "Soft Shell Tacos",
    "price": 318,
    "dietary": "veg",
    "description": "Chilli mayo, iceberg, crispy paneer, sauerkraut, jalapeno mayo and fried onion."
  },
  {
    "id": "chicken-tinga-tacos",
    "zomatoId": "ctl_819751867",
    "name": "Chicken Tinga Tacos",
    "category": "tacos",
    "categoryLabel": "Tacos & Mexican",
    "subCategory": "Soft Shell Tacos",
    "price": 342,
    "dietary": "non-veg",
    "description": "Chipotle mayo, iceberg, fried chicken, sour cream, jalapeño slice and spring onion."
  },
  {
    "id": "pulled-mushroom-chipotle-tacos",
    "zomatoId": "ctl_819751883",
    "name": "Pulled Mushroom Chipotle Tacos",
    "category": "tacos",
    "categoryLabel": "Tacos & Mexican",
    "subCategory": "Soft Shell Tacos",
    "price": 318,
    "dietary": "veg",
    "description": "Spicy pulled mushrooms, iceberg, pickled onion and chipotle mayo."
  },
  {
    "id": "wild-mushroom-birria-tacos",
    "zomatoId": "ctl_819751809",
    "name": "Wild Mushroom Birria Tacos",
    "category": "tacos",
    "categoryLabel": "Tacos & Mexican",
    "subCategory": "Birria Tacos",
    "price": 354,
    "dietary": "veg",
    "description": "Spiced exotic mushrooms, tomato chipotle sauce, monterey jack and Cheddar cheese and caramelized onion. Served with rich dipping broth."
  },
  {
    "id": "fajita-burrito-bowl",
    "zomatoId": "ctl_819751862",
    "name": "Fajita Burrito Bowl",
    "category": "tacos",
    "categoryLabel": "Tacos & Mexican",
    "subCategory": "Burrito Bowls",
    "price": 510,
    "dietary": "veg",
    "description": "Mexican rice, spiced fajita, vegetables, baked beans, salsa, crispies, crunchy iceberg, guacamole and sour cream."
  },
  {
    "id": "chipotle-paneer-bowl",
    "zomatoId": "ctl_819751835",
    "name": "Chipotle Paneer Bowl",
    "category": "tacos",
    "categoryLabel": "Tacos & Mexican",
    "subCategory": "Burrito Bowls",
    "price": 510,
    "dietary": "veg",
    "description": "Grilled chipotle paneer, mexican rice, salsa, baked beans, guacamole, iceberg, crispies and sour cream."
  },
  {
    "id": "wild-mushroom-bowl",
    "zomatoId": "ctl_819751863",
    "name": "Wild Mushroom Bowl",
    "category": "tacos",
    "categoryLabel": "Tacos & Mexican",
    "subCategory": "Burrito Bowls",
    "price": 510,
    "dietary": "veg",
    "description": "Spiced mushroom, Mexican rice, baked beans, charred corn, iceberg, guacamole, crispies and sour cream."
  },
  {
    "id": "smoked-chicken-bowl",
    "zomatoId": "ctl_819751839",
    "name": "Smoked Chicken Bowl",
    "category": "tacos",
    "categoryLabel": "Tacos & Mexican",
    "subCategory": "Burrito Bowls",
    "price": 510,
    "dietary": "non-veg",
    "description": "Chargrilled chicken, Mexican rice, fajita style pepper and beans, charred corn, guacamole, crispies and salsa."
  },
  {
    "id": "wild-mushroom-and-avocado-wrap",
    "zomatoId": "ctl_819751774",
    "name": "Wild Mushroom and Avocado Wrap",
    "category": "tacos",
    "categoryLabel": "Tacos & Mexican",
    "subCategory": "Burrito Wraps",
    "price": 342,
    "dietary": "veg",
    "description": "Tortillas wrapped around spiced pulled mushroom, Mexican rice, guacamole, cheese and sauerkraut."
  },
  {
    "id": "tex-mex-masala-corn-wrap",
    "zomatoId": "ctl_819751857",
    "name": "Tex Mex Masala Corn Wrap",
    "category": "tacos",
    "categoryLabel": "Tacos & Mexican",
    "subCategory": "Burrito Wraps",
    "price": 318,
    "dietary": "veg",
    "description": "Spiced corn, baked beans, Mexican rice, salsa roja, iceberg, cheese and jalapeno mayo."
  },
  {
    "id": "ghost-pepper-chicken-wrap",
    "zomatoId": "ctl_819751736",
    "name": "Ghost Pepper Chicken Wrap",
    "category": "tacos",
    "categoryLabel": "Tacos & Mexican",
    "subCategory": "Burrito Wraps",
    "price": 354,
    "dietary": "non-veg",
    "description": "Ghost pepper marinated chicken with jalapeno rice, iceberg, salsa and cheese."
  },
  {
    "id": "baja-black-bean-burger",
    "zomatoId": "ctl_825153030",
    "name": "Baja Black Bean Burger",
    "category": "burgers",
    "categoryLabel": "Burgers & Dolci",
    "subCategory": "Gourmet Burgers",
    "price": 294,
    "dietary": "veg",
    "description": "Chipotle mayo, iceberg lettuce, spiced black bean patty, cheese, pickled onion and jalapeno mayo."
  },
  {
    "id": "truffle-mushroom-burger",
    "zomatoId": "ctl_825153031",
    "name": "Truffle Mushroom Burger",
    "category": "burgers",
    "categoryLabel": "Burgers & Dolci",
    "subCategory": "Gourmet Burgers",
    "price": 342,
    "dietary": "veg",
    "description": "Garlic aioli, romaine lettuce, wild mushroom patty, cheese and balsamic onion."
  },
  {
    "id": "crispy-cottage-cheese-burger",
    "zomatoId": "ctl_825153032",
    "name": "Crispy Cottage Cheese Burger",
    "category": "burgers",
    "categoryLabel": "Burgers & Dolci",
    "subCategory": "Gourmet Burgers",
    "price": 294,
    "dietary": "veg",
    "description": "Fermented chilli spread, romaine lettuce, cottage cheese patty, cheese and gherkin."
  },
  {
    "id": "crispy-chicken-burger",
    "zomatoId": "ctl_825153033",
    "name": "Crispy Chicken Burger",
    "category": "burgers",
    "categoryLabel": "Burgers & Dolci",
    "subCategory": "Gourmet Burgers",
    "price": 342,
    "dietary": "non-veg",
    "description": "Crispy chicken, fermented chilli spread, romaine lettuce and gherkin."
  },
  {
    "id": "smash-mutton-burger",
    "zomatoId": "ctl_825153034",
    "name": "Smash Mutton Burger",
    "category": "burgers",
    "categoryLabel": "Burgers & Dolci",
    "subCategory": "Gourmet Burgers",
    "price": 414,
    "dietary": "non-veg",
    "description": "Spicy mayo, double smashed lamb patty, caramelized onion and cheese."
  },
  {
    "id": "mushroom-and-cheese-quesadilla",
    "zomatoId": "ctl_819751767",
    "name": "Mushroom and Cheese Quesadilla",
    "category": "tacos",
    "categoryLabel": "Tacos & Mexican",
    "subCategory": "Quesadillas",
    "price": 330,
    "dietary": "veg",
    "description": "Exotic chipotle mushroom with melted Cheddar cheese."
  },
  {
    "id": "fajita-veggies-quesadilla",
    "zomatoId": "ctl_819751784",
    "name": "Fajita Veggies Quesadilla",
    "category": "tacos",
    "categoryLabel": "Tacos & Mexican",
    "subCategory": "Quesadillas",
    "price": 318,
    "dietary": "veg",
    "description": "Caponata veggies cooked with melted Cheddar cheese."
  },
  {
    "id": "black-bean-quesadilla",
    "zomatoId": "ctl_819751820",
    "name": "Black Bean Quesadilla",
    "category": "tacos",
    "categoryLabel": "Tacos & Mexican",
    "subCategory": "Quesadillas",
    "price": 294,
    "dietary": "veg",
    "description": "Spiced black bean and veggies and Cheddar cheese."
  },
  {
    "id": "cayenne-chicken-quesadilla",
    "zomatoId": "ctl_819751868",
    "name": "Cayenne Chicken Quesadilla",
    "category": "tacos",
    "categoryLabel": "Tacos & Mexican",
    "subCategory": "Quesadillas",
    "price": 330,
    "dietary": "non-veg",
    "description": "Spicy grilled chicken slices and cheese."
  },
  {
    "id": "grilled-cottage-cheese-steak",
    "zomatoId": "ctl_819751888",
    "name": "Grilled Cottage Cheese Steak",
    "category": "pastas",
    "categoryLabel": "Pasta & Mains",
    "subCategory": "Large Plates",
    "price": 570,
    "dietary": "veg",
    "description": "Spinach, mushroom and ricotta stuffed paneer steak with mashed potatoes and sauteed veggies. Choice of sauce creamy mushroom and fermented chilli."
  },
  {
    "id": "mushroom-stroganoff",
    "zomatoId": "ctl_819751799",
    "name": "Mushroom Stroganoff",
    "category": "pastas",
    "categoryLabel": "Pasta & Mains",
    "subCategory": "Large Plates",
    "price": 570,
    "dietary": "veg",
    "description": "Herb rice, sauteed veggies and creamy mushroom stroganoff."
  },
  {
    "id": "chicken-stroganoff",
    "zomatoId": "ctl_819751745",
    "name": "Chicken Stroganoff",
    "category": "pastas",
    "categoryLabel": "Pasta & Mains",
    "subCategory": "Large Plates",
    "price": 570,
    "dietary": "non-veg",
    "description": "Herb rice, sauteed veggies and creamy chicken stroganoff."
  },
  {
    "id": "grilled-chicken-steak",
    "zomatoId": "ctl_819751877",
    "name": "Grilled Chicken Steak",
    "category": "pastas",
    "categoryLabel": "Pasta & Mains",
    "subCategory": "Large Plates",
    "price": 570,
    "dietary": "non-veg",
    "description": "Tender chicken steak with mashed potatoes and sautéed veggies. Choice of sauce demi glaze and fermented chilli."
  },
  {
    "id": "chicken-parmigiana",
    "zomatoId": "ctl_819751854",
    "name": "Chicken Parmigiana",
    "category": "pastas",
    "categoryLabel": "Pasta & Mains",
    "subCategory": "Large Plates",
    "price": 570,
    "dietary": "non-veg",
    "description": "Tomato spaghetti, crispy fried chicken topped with marinara, cheese and basil oil."
  },
  {
    "id": "chicken-schnitzel",
    "zomatoId": "ctl_819751859",
    "name": "Chicken Schnitzel",
    "category": "pastas",
    "categoryLabel": "Pasta & Mains",
    "subCategory": "Large Plates",
    "price": 570,
    "dietary": "non-veg",
    "description": "Spinach, bocconcini cheese stuffed crispy chicken with creamy mashed potatoes, veggies and Parmesan sauce."
  },
  {
    "id": "tres-leches",
    "zomatoId": "ctl_819751742",
    "name": "Tres Leches",
    "category": "burgers",
    "categoryLabel": "Burgers & Dolci",
    "subCategory": "Dolci & Desserts",
    "price": 318,
    "dietary": "veg",
    "description": "Moist spongy cake soaked in rich evaporated milk."
  },
  {
    "id": "french-press-brewed-coffee",
    "zomatoId": "ctl_819751737",
    "name": "French Press Brewed Coffee",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Hot Coffees",
    "price": 342,
    "dietary": "veg",
    "description": "Dose (18 g), water (250 g), fine grind (medium), 91–95°C, 8 minute steep full bodied and aromatic."
  },
  {
    "id": "cafe-latte",
    "zomatoId": "ctl_819751764",
    "name": "Cafe Latte",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Hot Coffees",
    "price": 270,
    "dietary": "veg",
    "description": "Milk forward coffee with a soft and mild flavour."
  },
  {
    "id": "pour-over-brewed-coffee",
    "zomatoId": "ctl_819751768",
    "name": "Pour Over Brewed Coffee",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Hot Coffees",
    "price": 342,
    "dietary": "veg",
    "description": "Single origin, dose (18 g), water (288 g), fine grind (medium), 91–95°C, 3 minute brew clarity and clean expression."
  },
  {
    "id": "cappuccino",
    "zomatoId": "ctl_819751777",
    "name": "Cappuccino",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Hot Coffees",
    "price": 234,
    "dietary": "veg",
    "description": "Espresso with hot milk and a thick layer of foam."
  },
  {
    "id": "flat-white",
    "zomatoId": "ctl_819751789",
    "name": "Flat White",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Hot Coffees",
    "price": 294,
    "dietary": "veg",
    "description": "Espresso with smooth steamed milk and minimal foam."
  },
  {
    "id": "americano",
    "zomatoId": "ctl_819751797",
    "name": "Americano",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Hot Coffees",
    "price": 174,
    "dietary": "veg",
    "description": "Espresso topped with hot water, smooth and easy to beverage."
  },
  {
    "id": "long-black",
    "zomatoId": "ctl_819751843",
    "name": "Long Black",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Hot Coffees",
    "price": 174,
    "dietary": "veg",
    "description": "Espresso brewed over hot water for a lighter taste."
  },
  {
    "id": "cortado",
    "zomatoId": "ctl_819751844",
    "name": "Cortado",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Hot Coffees",
    "price": 234,
    "dietary": "veg",
    "description": "Equal parts espresso, warm milk, balanced and bold."
  },
  {
    "id": "macchiato",
    "zomatoId": "ctl_819751848",
    "name": "Macchiato",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Hot Coffees",
    "price": 234,
    "dietary": "veg",
    "description": "Bold espresso with a touch of milk foam, strong and rich."
  },
  {
    "id": "espresso",
    "zomatoId": "ctl_819751885",
    "name": "Espresso",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Hot Coffees",
    "price": 114,
    "dietary": "veg",
    "description": "A strong single shot with intense coffee flavour."
  },
  {
    "id": "french-vanilla-latte",
    "zomatoId": "ctl_819751886",
    "name": "French Vanilla Latte",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Hot Coffees",
    "price": 222,
    "dietary": "veg",
    "description": "Creamy latte infused with sweet vanilla flavour."
  },
  {
    "id": "mochaccino",
    "zomatoId": "ctl_819751889",
    "name": "Mochaccino",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Hot Coffees",
    "price": 270,
    "dietary": "veg",
    "description": "Espresso blended with chocolate, steamed milk, rich and indulgent."
  },
  {
    "id": "d-and-c-cold-coffee",
    "zomatoId": "ctl_819751874",
    "name": "D&C Cold Coffee",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Iced & Cold Coffees",
    "price": 228,
    "dietary": "veg",
    "description": "Blended milk coffee, smooth and refreshing."
  },
  {
    "id": "iced-mocha",
    "zomatoId": "ctl_819751744",
    "name": "Iced Mocha",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Iced & Cold Coffees",
    "price": 270,
    "dietary": "veg",
    "description": "Espresso blended with chocolate, chilled milk served over ice for rich and refreshing."
  },
  {
    "id": "spanish-latte",
    "zomatoId": "ctl_819751750",
    "name": "Spanish Latte",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Iced & Cold Coffees",
    "price": 294,
    "dietary": "veg",
    "description": "Chilled milk coffee with gentle sweetness."
  },
  {
    "id": "iced-latte",
    "zomatoId": "ctl_819751760",
    "name": "Iced Latte",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Iced & Cold Coffees",
    "price": 270,
    "dietary": "veg",
    "description": "Cold milk with espresso over ice."
  },
  {
    "id": "espresso-tonic",
    "zomatoId": "ctl_819751823",
    "name": "Espresso Tonic",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Iced & Cold Coffees",
    "price": 270,
    "dietary": "veg",
    "description": "A refreshing blend of espresso, tonic water served over ice, citrusy and lightly bitter."
  },
  {
    "id": "mocha-frappe",
    "zomatoId": "ctl_819751824",
    "name": "Mocha Frappe",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Iced & Cold Coffees",
    "price": 270,
    "dietary": "veg",
    "description": "A chilled vanilla espresso chocolate milk and chocolate ice cream."
  },
  {
    "id": "iced-long-black",
    "zomatoId": "ctl_819751887",
    "name": "Iced Long Black",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Iced & Cold Coffees",
    "price": 174,
    "dietary": "veg",
    "description": "Espresso with chilled water and ice."
  },
  {
    "id": "strawberry-shortcake-latte",
    "zomatoId": "ctl_819751751",
    "name": "Strawberry Shortcake Latte",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "House Signature Crafts",
    "price": 342,
    "dietary": "veg",
    "description": "Cold brew, strawberry and vanilla cold foam."
  },
  {
    "id": "three-fields-cold-brew",
    "zomatoId": "ctl_819751770",
    "name": "Three Fields Cold Brew",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "House Signature Crafts",
    "price": 342,
    "dietary": "veg",
    "description": "Cold steeped coffee, coconut water, topped with banana foam."
  },
  {
    "id": "tiger-bomb-coffee",
    "zomatoId": "ctl_819751833",
    "name": "Tiger Bomb Coffee",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "House Signature Crafts",
    "price": 318,
    "dietary": "veg",
    "description": "Vanilla oat milk, espresso, whipped cream and orange zest."
  },
  {
    "id": "d-and-c-cold-brew-spritzer",
    "zomatoId": "ctl_819751834",
    "name": "D&C Cold Brew Spritzer",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "House Signature Crafts",
    "price": 294,
    "dietary": "veg",
    "description": "Cold brew with house made apple and jaggery shrub."
  },
  {
    "id": "caramel-cold-brew-latte",
    "zomatoId": "ctl_819751849",
    "name": "Caramel Cold Brew Latte",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "House Signature Crafts",
    "price": 318,
    "dietary": "veg",
    "description": "Cold brew, milk and caramel over ice."
  },
  {
    "id": "cold-brew-vanilla-cold-foam",
    "zomatoId": "ctl_819751875",
    "name": "Cold Brew Vanilla Cold Foam",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "House Signature Crafts",
    "price": 318,
    "dietary": "veg",
    "description": "House cold brew topped with vanilla cold foam."
  },
  {
    "id": "affogato",
    "zomatoId": "ctl_819751757",
    "name": "Affogato",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Sweet Dreams",
    "price": 270,
    "dietary": "veg",
    "description": "Classic combination of vanilla gelato and espresso."
  },
  {
    "id": "hot-chocolate",
    "zomatoId": "ctl_819751786",
    "name": "Hot Chocolate",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Sweet Dreams",
    "price": 342,
    "dietary": "veg",
    "description": "Dark and white hot chocolate made with single origin Indian cacao (70%)."
  },
  {
    "id": "chocolate-shake",
    "zomatoId": "ctl_819751761",
    "name": "Chocolate Shake",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Shakes",
    "price": 318,
    "dietary": "veg",
    "description": ""
  },
  {
    "id": "biscoff-shake",
    "zomatoId": "ctl_819751765",
    "name": "Biscoff Shake",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Shakes",
    "price": 390,
    "dietary": "veg",
    "description": "A luscious shake made with cold milk and biscoff spread."
  },
  {
    "id": "oreo-milkshake",
    "zomatoId": "ctl_819751806",
    "name": "Oreo Milkshake",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Shakes",
    "price": 354,
    "dietary": "veg",
    "description": "Silky cream infused with crushed chocolate cookies."
  },
  {
    "id": "vanilla-shake",
    "zomatoId": "ctl_819751812",
    "name": "Vanilla Shake",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Shakes",
    "price": 318,
    "dietary": "veg",
    "description": ""
  },
  {
    "id": "tiramisu-shake",
    "zomatoId": "ctl_819751827",
    "name": "Tiramisu Shake",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Shakes",
    "price": 414,
    "dietary": "veg",
    "description": "Vanilla, cream and tiramisu."
  },
  {
    "id": "strawberry-shake",
    "zomatoId": "ctl_819751828",
    "name": "Strawberry Shake",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Shakes",
    "price": 318,
    "dietary": "veg",
    "description": ""
  },
  {
    "id": "virgin-mojito",
    "zomatoId": "ctl_819751771",
    "name": "Virgin Mojito",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "House Craft Mocktails",
    "price": 234,
    "dietary": "veg",
    "description": "(Non alcoholic) Fresh lime, mint, simple syrup combined with soda water."
  },
  {
    "id": "hibiscus-watermelon-mocktail",
    "zomatoId": "ctl_819751778",
    "name": "Hibiscus Watermelon Mocktail",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "House Craft Mocktails",
    "price": 282,
    "dietary": "veg",
    "description": "(Non alcoholic) Hibiscus flower, watermelon, mint and soda."
  },
  {
    "id": "pandan-rose-cloud-mocktail",
    "zomatoId": "ctl_819751798",
    "name": "Pandan Rose Cloud Mocktail",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "House Craft Mocktails",
    "price": 318,
    "dietary": "veg",
    "description": "(Non alcoholic) Coconut water infused with rose topped with pandan cream."
  },
  {
    "id": "melon-splash-mocktail",
    "zomatoId": "ctl_819751805",
    "name": "Melon Splash Mocktail",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "House Craft Mocktails",
    "price": 234,
    "dietary": "veg",
    "description": "(Non alcoholic) Fresh watermelon with mint lime bubbles."
  },
  {
    "id": "virgin-espresso-martini-mocktail",
    "zomatoId": "ctl_819751825",
    "name": "Virgin Espresso Martini Mocktail",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "House Craft Mocktails",
    "price": 294,
    "dietary": "veg",
    "description": "(Non alcoholic) Fresh espresso combined with vanilla and strong cold brew."
  },
  {
    "id": "nara-vari-mocktail",
    "zomatoId": "ctl_819751826",
    "name": "Nara Vari Mocktail",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "House Craft Mocktails",
    "price": 282,
    "dietary": "veg",
    "description": "(Non alcoholic) Coconut cream, dipping cream and espresso."
  },
  {
    "id": "mango-tango-mocktail",
    "zomatoId": "ctl_819751850",
    "name": "Mango Tango Mocktail",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "House Craft Mocktails",
    "price": 294,
    "dietary": "veg",
    "description": "(Non alcoholic) Brazilian lemonade with mango finished with cream."
  },
  {
    "id": "golden-hour-mocktail",
    "zomatoId": "ctl_819751876",
    "name": "Golden Hour Mocktail",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "House Craft Mocktails",
    "price": 294,
    "dietary": "veg",
    "description": "(Non alcoholic) House apple shrub combined with soda water."
  },
  {
    "id": "mixed-berry-smoothie",
    "zomatoId": "ctl_819751759",
    "name": "Mixed Berry Smoothie",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Smoothies",
    "price": 318,
    "dietary": "veg",
    "description": "Yoghurt, mixed berries and nuts."
  },
  {
    "id": "apple-and-dates-smoothie",
    "zomatoId": "ctl_819751781",
    "name": "Apple and Dates Smoothie",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Smoothies",
    "price": 354,
    "dietary": "veg",
    "description": "Yoghurt, fresh apple, dates, mascarpone and superseeds."
  },
  {
    "id": "peanut-butter-banana-smoothie",
    "zomatoId": "ctl_819751822",
    "name": "Peanut Butter Banana Smoothie",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Smoothies",
    "price": 318,
    "dietary": "veg",
    "description": "Yoghurt, peanut butter, banana and honey."
  },
  {
    "id": "mixed-fresh-lime-soda",
    "zomatoId": "ctl_819751769",
    "name": "Mixed Fresh Lime Soda",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Ice Teas & Lemonade",
    "price": 198,
    "dietary": "veg",
    "description": ""
  },
  {
    "id": "sweet-fresh-lime-soda",
    "zomatoId": "ctl_819751776",
    "name": "Sweet Fresh Lime Soda",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Ice Teas & Lemonade",
    "price": 198,
    "dietary": "veg",
    "description": ""
  },
  {
    "id": "lemon-iced-tea",
    "zomatoId": "ctl_819751782",
    "name": "Lemon Iced Tea",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Ice Teas & Lemonade",
    "price": 198,
    "dietary": "veg",
    "description": ""
  },
  {
    "id": "salted-fresh-lime-soda",
    "zomatoId": "ctl_819751785",
    "name": "Salted Fresh Lime Soda",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Ice Teas & Lemonade",
    "price": 198,
    "dietary": "veg",
    "description": ""
  },
  {
    "id": "masala-coke",
    "zomatoId": "ctl_819751830",
    "name": "Masala Coke",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Ice Teas & Lemonade",
    "price": 198,
    "dietary": "veg",
    "description": ""
  },
  {
    "id": "masala-lemonade",
    "zomatoId": "ctl_819751873",
    "name": "Masala Lemonade",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Ice Teas & Lemonade",
    "price": 198,
    "dietary": "veg",
    "description": ""
  },
  {
    "id": "peach-iced-tea",
    "zomatoId": "ctl_819751881",
    "name": "Peach Iced Tea",
    "category": "drinks",
    "categoryLabel": "Coffee & Drinks",
    "subCategory": "Ice Teas & Lemonade",
    "price": 198,
    "dietary": "veg",
    "description": ""
  }
];

export const PIZZA_ITEMS: MenuItem[] = MENU_ITEMS.filter(
  (item) => item.category === 'pizzas'
);
