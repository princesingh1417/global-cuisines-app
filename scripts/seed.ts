import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Dish from '../src/models/Dish';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const seedData = [
  // Indian
  {
    name: 'Biryani', slug: 'biryani', cuisine: 'Indian',
    description: 'A mixed rice dish originating among the Muslims of the Indian subcontinent.',
    ingredients: ['Basmati rice', 'Chicken or Mutton', 'Yogurt', 'Onions', 'Spices (Cardamom, Clove, Cinnamon)', 'Saffron'],
    instructions: ['Marinate meat in yogurt and spices.', 'Parboil rice with whole spices.', 'Layer meat and rice in a pot.', 'Cook on dum (low heat) for 30 minutes.', 'Garnish with fried onions and serve hot.']
  },
  {
    name: 'Butter Chicken', slug: 'butter-chicken', cuisine: 'Indian',
    description: 'A type of curry made from chicken with a spiced tomato and butter sauce.',
    ingredients: ['Chicken', 'Tomatoes', 'Butter', 'Heavy cream', 'Garam masala', 'Kasuri methi'],
    instructions: ['Marinate and grill chicken pieces.', 'Prepare tomato gravy with butter and spices.', 'Add grilled chicken to the gravy.', 'Simmer with cream and kasuri methi.', 'Serve with naan or rice.']
  },
  {
    name: 'Naan', slug: 'naan', cuisine: 'Indian',
    description: 'A leavened, oven-baked flatbread.',
    ingredients: ['All-purpose flour', 'Yeast', 'Yogurt', 'Butter/Ghee', 'Garlic (optional)', 'Salt'],
    instructions: ['Mix flour, yeast, salt, and yogurt to soft dough.', 'Let it rest until doubled in size.', 'Divide and roll into flat ovals.', 'Cook in a tandoor or hot skillet.', 'Brush with melted butter and serve.']
  },
  {
    name: 'Palak Paneer', slug: 'palak-paneer', cuisine: 'Indian',
    description: 'A vegetarian dish consisting of paneer in a thick paste made from puréed spinach.',
    ingredients: ['Spinach', 'Paneer (Indian Cottage Cheese)', 'Onion', 'Tomato', 'Garlic', 'Garam masala'],
    instructions: ['Blanch and puree spinach.', 'Sauté chopped onions, garlic, and tomatoes.', 'Add spices and spinach puree.', 'Simmer then add paneer cubes.', 'Top with a dollop of cream and serve.']
  },
  {
    name: 'Samosa', slug: 'samosa', cuisine: 'Indian',
    description: 'A fried or baked pastry with a savory filling.',
    ingredients: ['Flour (for pastry)', 'Potatoes', 'Peas', 'Cumin seeds', 'Coriander powder', 'Oil for frying'],
    instructions: ['Prepare dough and let it rest.', 'Boil and mash potatoes, mix with peas and spices.', 'Roll dough and shape into cones.', 'Fill cones with potato mixture and seal.', 'Deep fry until golden brown.']
  },
  {
    name: 'Rogan Josh', slug: 'rogan-josh', cuisine: 'Indian',
    description: 'An aromatic meat dish of Persian or Kashmiri origin.',
    ingredients: ['Mutton', 'Yogurt', 'Kashmiri red chili powder', 'Fennel powder', 'Ginger powder', 'Mustard oil'],
    instructions: ['Heat oil and add whole spices.', 'Sear mutton pieces until browned.', 'Add yogurt paste and ground spices.', 'Slow cook until meat is tender and oil separates.', 'Serve hot with rice.']
  },
  {
    name: 'Masala Dosa', slug: 'masala-dosa', cuisine: 'Indian',
    description: 'A popular South Indian dish made from a batter of rice and lentils, filled with potato curry.',
    ingredients: ['Rice & Lentil batter', 'Potatoes', 'Onions', 'Mustard seeds', 'Curry leaves', 'Turmeric'],
    instructions: ['Prepare potato filling by tempering spices, onions, and boiled potatoes.', 'Spread a thin layer of batter on a hot griddle.', 'Cook until crispy and golden.', 'Place potato filling in the center and fold.', 'Serve with sambar and chutney.']
  },

  // Italian
  {
    name: 'Margherita Pizza', slug: 'margherita-pizza', cuisine: 'Italian',
    description: 'A classic Neapolitan pizza with tomatoes, mozzarella cheese, and fresh basil.',
    ingredients: ['Pizza dough', 'San Marzano tomatoes', 'Fresh mozzarella', 'Fresh basil', 'Olive oil', 'Salt'],
    instructions: ['Stretch pizza dough into a circle.', 'Spread crushed tomatoes evenly.', 'Tear mozzarella and arrange on top.', 'Bake in a very hot oven until crust is blistered.', 'Garnish with fresh basil and a drizzle of olive oil.']
  },
  {
    name: 'Spaghetti Carbonara', slug: 'spaghetti-carbonara', cuisine: 'Italian',
    description: 'Italian pasta dish from Rome made with egg, hard cheese, cured pork, and black pepper.',
    ingredients: ['Spaghetti', 'Guanciale or Pancetta', 'Pecorino Romano cheese', 'Eggs', 'Black pepper'],
    instructions: ['Boil pasta until al dente.', 'Fry guanciale until crispy.', 'Whisk eggs and cheese in a bowl.', 'Toss hot pasta with guanciale and fat away from heat.', 'Quickly mix in egg mixture to create a creamy sauce. Serve with pepper.']
  },
  {
    name: 'Lasagna', slug: 'lasagna', cuisine: 'Italian',
    description: 'Stacked layers of flat pasta alternating with fillings such as ragù, cheese, and seasonings.',
    ingredients: ['Lasagna noodles', 'Bolognese sauce (Ragù)', 'Béchamel sauce', 'Parmigiano-Reggiano', 'Mozzarella'],
    instructions: ['Preheat oven to 375°F (190°C).', 'Spread ragù at the bottom of a baking dish.', 'Layer pasta, ragù, béchamel, and cheese.', 'Repeat layers ending with cheese on top.', 'Bake for 45 minutes until golden and bubbly.']
  },
  {
    name: 'Risotto', slug: 'risotto', cuisine: 'Italian',
    description: 'Northern Italian rice dish cooked with broth until it reaches a creamy consistency.',
    ingredients: ['Arborio rice', 'Chicken or vegetable broth', 'Onion', 'White wine', 'Parmesan cheese', 'Butter'],
    instructions: ['Sauté finely chopped onions in butter.', 'Toast the rice for a minute.', 'Deglaze with white wine.', 'Gradually add warm broth, stirring continuously.', 'Finish with butter and parmesan cheese (mantecatura).']
  },
  {
    name: 'Tiramisu', slug: 'tiramisu', cuisine: 'Italian',
    description: 'A coffee-flavoured Italian dessert.',
    ingredients: ['Ladyfingers (Savoiardi)', 'Mascarpone cheese', 'Espresso coffee', 'Eggs', 'Sugar', 'Cocoa powder'],
    instructions: ['Beat egg yolks with sugar, then fold in mascarpone.', 'Whip egg whites and fold into the mascarpone mixture.', 'Dip ladyfingers in cold espresso.', 'Layer ladyfingers and mascarpone cream in a dish.', 'Dust heavily with cocoa powder and chill before serving.']
  },
  {
    name: 'Bruschetta', slug: 'bruschetta', cuisine: 'Italian',
    description: 'Grilled bread rubbed with garlic and topped with olive oil and salt.',
    ingredients: ['Rustic bread', 'Tomatoes', 'Garlic', 'Fresh basil', 'Extra virgin olive oil', 'Balsamic glaze (optional)'],
    instructions: ['Dice tomatoes and mix with basil, olive oil, and salt.', 'Toast bread slices until crispy.', 'Rub warm bread with a raw garlic clove.', 'Top with the tomato mixture.', 'Serve immediately.']
  },
  {
    name: 'Focaccia', slug: 'focaccia', cuisine: 'Italian',
    description: 'A flat leavened oven-baked Italian bread product.',
    ingredients: ['Bread flour', 'Yeast', 'Warm water', 'Olive oil', 'Flaky sea salt', 'Rosemary'],
    instructions: ['Mix flour, water, yeast, and salt. Knead into a wet dough.', 'Let it rise in an oiled pan until doubled.', 'Dimple the top with fingers.', 'Drizzle generously with olive oil and sprinkle rosemary and salt.', 'Bake until golden and crisp.']
  },

  // Continental
  {
    name: 'Beef Wellington', slug: 'beef-wellington', cuisine: 'Continental',
    description: 'A steak dish of English origin, made out of fillet steak coated with pâté and duxelles, wrapped in puff pastry.',
    ingredients: ['Beef tenderloin', 'Puff pastry', 'Mushrooms (Duxelles)', 'Prosciutto', 'Mustard', 'Egg yolks'],
    instructions: ['Sear the beef tenderloin and let cool. Brush with mustard.', 'Cook finely chopped mushrooms until dry to make duxelles.', 'Lay out prosciutto, spread duxelles, and wrap around beef.', 'Wrap tightly in puff pastry and brush with egg wash.', 'Bake until pastry is golden and beef is medium-rare.']
  },
  {
    name: 'Quiche Lorraine', slug: 'quiche-lorraine', cuisine: 'Continental',
    description: 'A savory tart with a pastry crust filled with custard and lardon or bacon.',
    ingredients: ['Pie crust', 'Bacon or lardons', 'Eggs', 'Heavy cream', 'Gruyère cheese', 'Nutmeg'],
    instructions: ['Blind bake the pie crust.', 'Fry bacon strips until crisp.', 'Whisk eggs, cream, nutmeg, salt, and pepper.', 'Layer bacon and cheese in the crust.', 'Pour in the custard and bake until set.']
  },
  {
    name: 'French Onion Soup', slug: 'french-onion-soup', cuisine: 'Continental',
    description: 'A type of soup usually based on meat stock and onions, and often served gratinéed.',
    ingredients: ['Onions', 'Beef broth', 'Butter', 'Baguette slices', 'Gruyère cheese', 'Thyme'],
    instructions: ['Caramelize sliced onions slowly in butter.', 'Deglaze and add beef broth and thyme. Simmer.', 'Toast the baguette slices.', 'Ladle soup into bowls, top with toast and cheese.', 'Broil until cheese is melted and browned.']
  },
  {
    name: 'Coq Au Vin', slug: 'coq-au-vin', cuisine: 'Continental',
    description: 'A French dish of chicken braised with wine, lardons, mushrooms, and optionally garlic.',
    ingredients: ['Chicken (bone-in)', 'Red wine (Burgundy)', 'Bacon lardons', 'Mushrooms', 'Pearl onions', 'Chicken stock'],
    instructions: ['Brown the chicken pieces and bacon in a pot.', 'Sauté mushrooms and pearl onions.', 'Deglaze the pot and add chicken, wine, and stock.', 'Braise in the oven until chicken is tender.', 'Reduce the sauce and serve over mashed potatoes.']
  },
  {
    name: 'Ratatouille', slug: 'ratatouille', cuisine: 'Continental',
    description: 'A French Provençal stewed vegetable dish.',
    ingredients: ['Eggplant', 'Zucchini', 'Bell peppers', 'Tomatoes', 'Onion', 'Garlic', 'Herbes de Provence'],
    instructions: ['Dice all vegetables evenly.', 'Sauté onions, garlic, and bell peppers.', 'Add eggplant, zucchini, and tomatoes.', 'Season with herbs and simmer gently until tender.', 'Serve hot or cold as a side dish or main.']
  },
  {
    name: 'Bouillabaisse', slug: 'bouillabaisse', cuisine: 'Continental',
    description: 'A traditional Provençal fish stew originating from the port city of Marseille.',
    ingredients: ['Assorted rockfish', 'Shrimp/Mussels', 'Tomatoes', 'Leeks', 'Saffron', 'Fennel'],
    instructions: ['Prepare a savory broth with tomatoes, leeks, fennel, and saffron.', 'Simmer the broth to develop flavors.', 'Add firmer fish first, then shellfish.', 'Cook until seafood is just done.', 'Serve with rouille and toasted bread.']
  },
  {
    name: 'Crepes', slug: 'crepes', cuisine: 'Continental',
    description: 'Very thin pancakes, originating from Brittany in France.',
    ingredients: ['All-purpose flour', 'Eggs', 'Milk', 'Butter', 'Salt', 'Sugar (optional)'],
    instructions: ['Blend flour, eggs, milk, and melted butter until smooth.', 'Let the batter rest for 30 minutes.', 'Heat a lightly buttered non-stick pan.', 'Pour a thin layer of batter and swirl to coat the pan.', 'Cook for 1 minute, flip, and cook 30 seconds. Serve with fillings.']
  },

  // Mexican
  {
    name: 'Tacos al Pastor', slug: 'tacos-al-pastor', cuisine: 'Mexican',
    description: 'Tacos made with spit-grilled pork, developed in Central Mexico.',
    ingredients: ['Pork shoulder', 'Achiote paste', 'Pineapple', 'Corn tortillas', 'Onions', 'Cilantro'],
    instructions: ['Marinate pork in achiote and spices.', 'Cook pork slices and dice them.', 'Warm the corn tortillas.', 'Assemble tacos with pork, diced pineapple, onions, and cilantro.', 'Serve with salsa and lime wedges.']
  },
  {
    name: 'Guacamole', slug: 'guacamole', cuisine: 'Mexican',
    description: 'An avocado-based dip, spread, or salad.',
    ingredients: ['Ripe avocados', 'Lime juice', 'Red onion', 'Jalapeño', 'Cilantro', 'Salt'],
    instructions: ['Mash the avocados in a bowl.', 'Stir in finely diced onion, jalapeño, and cilantro.', 'Add lime juice and salt to taste.', 'Mix gently to keep it slightly chunky.', 'Serve with tortilla chips.']
  },
  {
    name: 'Enchiladas', slug: 'enchiladas', cuisine: 'Mexican',
    description: 'Corn tortillas rolled around a filling and covered with a savory sauce.',
    ingredients: ['Corn tortillas', 'Chicken or cheese filling', 'Enchilada sauce (Red or Green)', 'Cheese', 'Sour cream'],
    instructions: ['Lightly fry tortillas to soften.', 'Dip tortillas in warm enchilada sauce.', 'Place filling inside, roll up, and arrange in a dish.', 'Pour remaining sauce over the top and cover with cheese.', 'Bake until cheese is bubbly and melted.']
  },
  {
    name: 'Churros', slug: 'churros', cuisine: 'Mexican',
    description: 'A fried dough pastry—predominantly choux—snack.',
    ingredients: ['Water', 'Butter', 'Flour', 'Eggs', 'Sugar', 'Cinnamon', 'Oil for frying'],
    instructions: ['Boil water and butter, then stir in flour to form a dough.', 'Let cool slightly and beat in eggs one at a time.', 'Pipe dough through a star tip into hot oil.', 'Fry until golden brown and crispy.', 'Roll in cinnamon sugar while warm.']
  },
  {
    name: 'Quesadilla', slug: 'quesadilla', cuisine: 'Mexican',
    description: 'A tortilla, typically a corn or flour tortilla, filled primarily with cheese, and sometimes meats, spices, and other fillings.',
    ingredients: ['Flour or corn tortillas', 'Oaxaca or Monterey Jack cheese', 'Butter or oil', 'Salsa'],
    instructions: ['Heat a skillet over medium heat.', 'Place a tortilla in the skillet and sprinkle cheese on one half.', 'Fold the other half over the cheese to form a half-moon.', 'Cook until the bottom is crispy, then flip.', 'Serve hot, sliced into wedges.']
  },
  {
    name: 'Fajitas', slug: 'fajitas', cuisine: 'Mexican',
    description: 'Any stripped grilled meat with stripped peppers and onions, usually seared on a skillet.',
    ingredients: ['Skirt steak or chicken breast', 'Bell peppers', 'Onions', 'Fajita seasoning', 'Flour tortillas'],
    instructions: ['Slice meat, peppers, and onions into strips.', 'Marinate meat in fajita seasoning and a little oil.', 'Sear meat in a smoking hot cast-iron skillet.', 'Add vegetables and cook until charred but crisp.', 'Serve sizzling with tortillas and sides.']
  },
  {
    name: 'Tamales', slug: 'tamales', cuisine: 'Mexican',
    description: 'A traditional Mesoamerican dish made of masa, steamed in a corn husk or banana leaf.',
    ingredients: ['Masa harina (corn dough)', 'Pork or chicken filling', 'Lard or shortening', 'Corn husks', 'Red or green salsa'],
    instructions: ['Soak corn husks in warm water until pliable.', 'Whip masa with lard and broth until fluffy.', 'Spread masa on a husk and add meat filling.', 'Fold the husk to seal the tamale.', 'Steam for 1-2 hours until masa separates from the husk.']
  },

  // Chinese
  {
    name: 'Kung Pao Chicken', slug: 'kung-pao-chicken', cuisine: 'Chinese',
    description: 'A highly aromatic, spicy, hot, and somewhat sweet Chinese dish native to Sichuan.',
    ingredients: ['Chicken breast', 'Peanuts', 'Dried red chilies', 'Sichuan peppercorns', 'Soy sauce', 'Vinegar'],
    instructions: ['Dice chicken and marinate with soy sauce and cornstarch.', 'Heat oil and lightly fry peanuts.', 'Stir fry chilies and peppercorns until fragrant.', 'Add chicken and stir fry until cooked.', 'Pour in combined sauce ingredients and toss well.']
  },
  {
    name: 'Sweet and Sour Pork', slug: 'sweet-and-sour-pork', cuisine: 'Chinese',
    description: 'A Chinese dish consisting of deep-fried pork covered in a sweet and sour sauce.',
    ingredients: ['Pork tenderloin', 'Pineapple chunks', 'Bell peppers', 'Vinegar', 'Ketchup', 'Sugar', 'Cornstarch'],
    instructions: ['Coat pork cubes in batter and deep fry until crispy.', 'Whisk vinegar, ketchup, sugar, and soy sauce.', 'Sauté peppers and pineapple briefly.', 'Add sauce and thicken with cornstarch slurry.', 'Toss crispy pork in the sauce until coated.']
  },
  {
    name: 'Dim Sum (Har Gow)', slug: 'dim-sum-har-gow', cuisine: 'Chinese',
    description: 'Traditional Chinese dumplings with a translucent wrapper filled with shrimp.',
    ingredients: ['Shrimp', 'Wheat starch', 'Tapioca starch', 'Bamboo shoots', 'Sesame oil', 'White pepper'],
    instructions: ['Finely chop shrimp and mix with seasonings and bamboo shoots.', 'Make dough using boiling water and starches.', 'Roll dough into thin wrappers.', 'Pleat wrappers around the shrimp filling forming a pouch.', 'Steam for 6-8 minutes until translucent.']
  },
  {
    name: 'Peking Duck', slug: 'peking-duck', cuisine: 'Chinese',
    description: 'A famous duck dish from Beijing that has been prepared since the imperial era.',
    ingredients: ['Whole duck', 'Maltose syrup', 'Soy sauce', 'Pancakes', 'Scallions', 'Hoisin sauce'],
    instructions: ['Parboil the duck and brush with maltose glaze.', 'Hang to dry for 24 hours to crisp the skin.', 'Roast in a hot oven until skin is crackling and deep amber.', 'Carve thin slices of meat and skin.', 'Serve rolled in thin pancakes with hoisin and scallions.']
  },
  {
    name: 'Chow Mein', slug: 'chow-mein', cuisine: 'Chinese',
    description: 'A Chinese stir-fried noodle dish.',
    ingredients: ['Egg noodles', 'Cabbage', 'Carrots', 'Soy sauce', 'Oyster sauce', 'Sesame oil', 'Chicken/Pork (optional)'],
    instructions: ['Boil noodles briefly, then drain and set aside.', 'Stir fry vegetables and protein in a wok at high heat.', 'Add noodles and toss vigorously.', 'Add soy sauce, oyster sauce, and seasonings.', 'Stir fry until noodles are coated and slightly charred.']
  },
  {
    name: 'Spring Rolls', slug: 'spring-rolls', cuisine: 'Chinese',
    description: 'A large variety of filled, rolled appetizers or dim sum found in East Asian cuisine.',
    ingredients: ['Spring roll wrappers', 'Cabbage', 'Carrot', 'Glass noodles', 'Soy sauce', 'Oil for frying'],
    instructions: ['Soak glass noodles and chop finely.', 'Stir fry cabbage and carrots, mix with noodles.', 'Place filling in wrappers and roll tightly, sealing edges.', 'Deep fry until golden and crispy.', 'Serve with sweet chili dipping sauce.']
  },
  {
    name: 'Mapo Tofu', slug: 'mapo-tofu', cuisine: 'Chinese',
    description: 'A popular Chinese dish from Sichuan province consisting of tofu in a spicy, umami-rich sauce.',
    ingredients: ['Soft tofu', 'Ground pork or beef', 'Doubanjiang (Spicy broad bean paste)', 'Sichuan peppercorns', 'Chili oil', 'Scallions'],
    instructions: ['Blanch tofu cubes in salted water.', 'Stir fry ground meat until browned.', 'Add doubanjiang and toast until oil turns red.', 'Add broth and tofu, simmering gently.', 'Thicken with cornstarch and dust generously with ground Sichuan peppercorns.']
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log('Connected to MongoDB.');

    // Clear existing data
    await Dish.deleteMany({});
    console.log('Cleared existing dishes.');

    // Insert new data
    await Dish.insertMany(seedData);
    console.log(`Successfully seeded ${seedData.length} dishes.`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
