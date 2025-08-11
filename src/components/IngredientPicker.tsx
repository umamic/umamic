import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Comprehensive ingredient list organized by category
const ingredientCategories = {
  'proteins': [
    'chicken breast', 'chicken thighs', 'chicken wings', 'ground chicken',
    'beef steak', 'ground beef', 'beef roast', 'beef ribs', 'beef tenderloin',
    'pork chops', 'pork tenderloin', 'ground pork', 'bacon', 'ham', 'sausage',
    'salmon', 'tuna', 'cod', 'shrimp', 'crab', 'lobster', 'scallops', 'mussels', 'clams',
    'eggs', 'tofu', 'tempeh', 'seitan', 'lentils', 'chickpeas', 'black beans', 'kidney beans',
    'turkey breast', 'ground turkey', 'duck', 'lamb chops', 'ground lamb', 'fish fillets',
    'sardines', 'mackerel', 'halibut', 'squid', 'octopus', 'paneer', 'cottage cheese'
  ],
  'vegetables': [
    'onion', 'garlic', 'tomatoes', 'bell peppers', 'carrots', 'celery', 'potatoes',
    'sweet potatoes', 'broccoli', 'cauliflower', 'spinach', 'kale', 'lettuce', 'cabbage',
    'zucchini', 'eggplant', 'mushrooms', 'asparagus', 'green beans', 'peas', 'corn',
    'cucumber', 'avocado', 'leeks', 'shallots', 'scallions', 'jalapeños', 'serrano peppers',
    'poblano peppers', 'artichokes', 'brussels sprouts', 'radishes', 'turnips', 'parsnips',
    'beets', 'bok choy', 'swiss chard', 'arugula', 'fennel', 'okra', 'butternut squash',
    'acorn squash', 'pumpkin', 'sweet corn', 'snow peas', 'snap peas', 'red onion',
    'yellow onion', 'white onion', 'cherry tomatoes', 'roma tomatoes', 'beefsteak tomatoes'
  ],
  'fruits': [
    'apples', 'bananas', 'oranges', 'lemons', 'limes', 'strawberries', 'blueberries',
    'raspberries', 'blackberries', 'grapes', 'pineapple', 'mango', 'papaya', 'kiwi',
    'peaches', 'pears', 'plums', 'cherries', 'watermelon', 'cantaloupe', 'honeydew',
    'coconut', 'cranberries', 'pomegranate', 'figs', 'dates', 'apricots', 'grapefruit',
    'tangerines', 'rhubarb', 'passion fruit', 'dragon fruit', 'lychee', 'guava'
  ],
  'grains & starches': [
    'rice', 'brown rice', 'wild rice', 'jasmine rice', 'basmati rice', 'arborio rice',
    'pasta', 'spaghetti', 'penne', 'fusilli', 'fettuccine', 'lasagna sheets', 'macaroni',
    'bread', 'whole wheat bread', 'sourdough', 'baguette', 'pita bread', 'naan',
    'quinoa', 'bulgur', 'couscous', 'barley', 'oats', 'polenta', 'farro', 'millet',
    'buckwheat', 'amaranth', 'tortillas', 'flour tortillas', 'corn tortillas', 'ramen noodles',
    'instant noodles', 'egg noodles', 'rice noodles', 'udon noodles'
  ],
  'dairy & alternatives': [
    'milk', 'whole milk', 'skim milk', 'almond milk', 'soy milk', 'coconut milk', 'oat milk',
    'heavy cream', 'sour cream', 'greek yogurt', 'regular yogurt', 'cottage cheese',
    'cream cheese', 'ricotta cheese', 'mozzarella cheese', 'cheddar cheese', 'parmesan cheese',
    'feta cheese', 'goat cheese', 'swiss cheese', 'blue cheese', 'brie cheese',
    'butter', 'margarine', 'ghee', 'buttermilk', 'condensed milk', 'evaporated milk'
  ],
  'pantry staples': [
    'olive oil', 'vegetable oil', 'coconut oil', 'sesame oil', 'canola oil', 'avocado oil',
    'vinegar', 'balsamic vinegar', 'apple cider vinegar', 'white wine vinegar', 'rice vinegar',
    'soy sauce', 'fish sauce', 'worcestershire sauce', 'hot sauce', 'sriracha',
    'ketchup', 'mustard', 'mayonnaise', 'honey', 'maple syrup', 'brown sugar', 'white sugar',
    'flour', 'all-purpose flour', 'whole wheat flour', 'almond flour', 'coconut flour',
    'baking powder', 'baking soda', 'yeast', 'cornstarch', 'breadcrumbs', 'panko',
    'canned tomatoes', 'tomato paste', 'tomato sauce', 'chicken broth', 'vegetable broth',
    'beef broth', 'wine', 'cooking wine', 'vanilla extract'
  ],
  'herbs & spices': [
    'basil', 'oregano', 'thyme', 'rosemary', 'sage', 'parsley', 'cilantro', 'dill',
    'mint', 'chives', 'tarragon', 'bay leaves', 'paprika', 'cumin', 'coriander',
    'turmeric', 'ginger', 'garlic powder', 'onion powder', 'chili powder', 'cayenne pepper',
    'black pepper', 'white pepper', 'red pepper flakes', 'cinnamon', 'nutmeg', 'cloves',
    'cardamom', 'allspice', 'star anise', 'fennel seeds', 'mustard seeds', 'sesame seeds',
    'poppy seeds', 'vanilla extract', 'almond extract', 'lemon zest', 'orange zest',
    'curry powder', 'garam masala', 'italian seasoning', 'herbs de provence', 'za\'atar'
  ],
  'nuts & seeds': [
    'almonds', 'walnuts', 'pecans', 'cashews', 'pistachios', 'hazelnuts', 'macadamia nuts',
    'brazil nuts', 'pine nuts', 'peanuts', 'sunflower seeds', 'pumpkin seeds', 'chia seeds',
    'flax seeds', 'hemp seeds', 'tahini', 'almond butter', 'peanut butter', 'cashew butter',
    'sesame seeds', 'poppy seeds', 'coconut flakes', 'raisins', 'dried cranberries'
  ],
  'condiments & sauces': [
    'marinara sauce', 'alfredo sauce', 'pesto', 'bbq sauce', 'teriyaki sauce', 'hoisin sauce',
    'oyster sauce', 'coconut cream', 'salsa', 'guacamole', 'hummus', 'ranch dressing',
    'caesar dressing', 'italian dressing', 'balsamic glaze', 'miso paste', 'curry paste',
    'harissa', 'tahini', 'dijon mustard', 'yellow mustard', 'whole grain mustard'
  ]
};

interface IngredientPickerProps {
  selectedIngredients: string[];
  onIngredientToggle: (ingredient: string) => void;
}

const IngredientPicker = ({ selectedIngredients, onIngredientToggle }: IngredientPickerProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get all ingredients as a flat array for searching
  const allIngredients = Object.values(ingredientCategories).flat();

  // Filter ingredients based on search term
  const filteredIngredients = searchTerm
    ? allIngredients.filter(ingredient =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Get ingredients for selected category
  const categoryIngredients = selectedCategory
    ? ingredientCategories[selectedCategory as keyof typeof ingredientCategories]
    : [];

  const handleIngredientClick = (ingredient: string) => {
    onIngredientToggle(ingredient);
    setSearchTerm('');
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          what do you have?
        </h1>
        <p className="text-lg text-muted-foreground">
          select your available ingredients
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="search for ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-10 h-12 text-lg"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search Results */}
        {searchTerm && (
          <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-lg mt-1 max-h-60 overflow-y-auto z-10 shadow-lg">
            {filteredIngredients.length > 0 ? (
              <div className="p-2">
                {filteredIngredients.slice(0, 10).map((ingredient) => (
                  <button
                    key={ingredient}
                    onClick={() => handleIngredientClick(ingredient)}
                    className="w-full text-left px-3 py-2 rounded hover:bg-muted transition-colors"
                  >
                    {ingredient}
                  </button>
                ))}
                {filteredIngredients.length > 10 && (
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    and {filteredIngredients.length - 10} more...
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                no ingredients found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Selected Ingredients */}
      {selectedIngredients.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">selected ingredients ({selectedIngredients.length})</h3>
          <div className="flex flex-wrap gap-2">
            {selectedIngredients.map((ingredient) => (
              <button
                key={ingredient}
                onClick={() => onIngredientToggle(ingredient)}
                className="selected-ingredient"
              >
                {ingredient}
                <X className="w-4 h-4 ml-2" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Category Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">browse by category</h3>
        <div className="flex flex-wrap gap-2">
          {Object.keys(ingredientCategories).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              className={`category-chip ${selectedCategory === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Category Ingredients */}
      {selectedCategory && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 capitalize">{selectedCategory}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {categoryIngredients.map((ingredient) => (
              <button
                key={ingredient}
                onClick={() => onIngredientToggle(ingredient)}
                className={`ingredient-chip ${
                  selectedIngredients.includes(ingredient) ? 'selected' : ''
                }`}
              >
                {ingredient}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      {selectedIngredients.length === 0 && !selectedCategory && !searchTerm && (
        <div className="text-center text-muted-foreground">
          <p>search for ingredients above or browse by category</p>
        </div>
      )}
    </div>
  );
};

export default IngredientPicker;