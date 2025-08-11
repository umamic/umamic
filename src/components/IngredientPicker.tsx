import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface Ingredient {
  name: string;
  category: string;
}

const ingredients: Ingredient[] = [
  // proteins
  { name: 'chicken breast', category: 'proteins' },
  { name: 'chicken thigh', category: 'proteins' },
  { name: 'chicken wings', category: 'proteins' },
  { name: 'ground chicken', category: 'proteins' },
  { name: 'turkey', category: 'proteins' },
  { name: 'duck', category: 'proteins' },
  { name: 'pork chops', category: 'proteins' },
  { name: 'pork belly', category: 'proteins' },
  { name: 'pork shoulder', category: 'proteins' },
  { name: 'ground pork', category: 'proteins' },
  { name: 'beef steak', category: 'proteins' },
  { name: 'ground beef', category: 'proteins' },
  { name: 'beef brisket', category: 'proteins' },
  { name: 'short ribs', category: 'proteins' },
  { name: 'lamb chops', category: 'proteins' },
  { name: 'ground lamb', category: 'proteins' },
  { name: 'lamb leg', category: 'proteins' },
  { name: 'goat', category: 'proteins' },
  { name: 'veal', category: 'proteins' },
  { name: 'salmon', category: 'proteins' },
  { name: 'cod', category: 'proteins' },
  { name: 'tuna', category: 'proteins' },
  { name: 'halibut', category: 'proteins' },
  { name: 'sardine', category: 'proteins' },
  { name: 'shrimp', category: 'proteins' },
  { name: 'crab', category: 'proteins' },
  { name: 'lobster', category: 'proteins' },
  { name: 'mussels', category: 'proteins' },
  { name: 'clams', category: 'proteins' },
  { name: 'scallops', category: 'proteins' },
  { name: 'squid', category: 'proteins' },
  { name: 'octopus', category: 'proteins' },
  { name: 'tofu', category: 'proteins' },
  { name: 'tempeh', category: 'proteins' },
  { name: 'seitan', category: 'proteins' },
  { name: 'eggs', category: 'proteins' },
  { name: 'paneer', category: 'proteins' },
  { name: 'halloumi', category: 'proteins' },
  { name: 'plant-based meat', category: 'proteins' },

  // vegetables
  { name: 'carrot', category: 'vegetables' },
  { name: 'potato', category: 'vegetables' },
  { name: 'sweet potato', category: 'vegetables' },
  { name: 'onion', category: 'vegetables' },
  { name: 'garlic', category: 'vegetables' },
  { name: 'bell pepper', category: 'vegetables' },
  { name: 'broccoli', category: 'vegetables' },
  { name: 'cauliflower', category: 'vegetables' },
  { name: 'spinach', category: 'vegetables' },
  { name: 'kale', category: 'vegetables' },
  { name: 'cabbage', category: 'vegetables' },
  { name: 'zucchini', category: 'vegetables' },
  { name: 'eggplant', category: 'vegetables' },
  { name: 'tomato', category: 'vegetables' },
  { name: 'cucumber', category: 'vegetables' },
  { name: 'celery', category: 'vegetables' },
  { name: 'leek', category: 'vegetables' },
  { name: 'fennel', category: 'vegetables' },
  { name: 'radish', category: 'vegetables' },
  { name: 'beet', category: 'vegetables' },
  { name: 'green beans', category: 'vegetables' },
  { name: 'snow peas', category: 'vegetables' },
  { name: 'artichoke', category: 'vegetables' },
  { name: 'okra', category: 'vegetables' },
  { name: 'chayote', category: 'vegetables' },
  { name: 'corn', category: 'vegetables' },
  { name: 'turnip', category: 'vegetables' },
  { name: 'shiitake mushroom', category: 'vegetables' },
  { name: 'button mushroom', category: 'vegetables' },
  { name: 'cremini mushroom', category: 'vegetables' },
  { name: 'oyster mushroom', category: 'vegetables' },
  { name: 'enoki mushroom', category: 'vegetables' },

  // fruits
  { name: 'apple', category: 'fruits' },
  { name: 'banana', category: 'fruits' },
  { name: 'orange', category: 'fruits' },
  { name: 'lemon', category: 'fruits' },
  { name: 'lime', category: 'fruits' },
  { name: 'grapefruit', category: 'fruits' },
  { name: 'mango', category: 'fruits' },
  { name: 'pineapple', category: 'fruits' },
  { name: 'strawberry', category: 'fruits' },
  { name: 'raspberry', category: 'fruits' },
  { name: 'blueberry', category: 'fruits' },
  { name: 'blackberry', category: 'fruits' },
  { name: 'cherry', category: 'fruits' },
  { name: 'grape', category: 'fruits' },
  { name: 'kiwi', category: 'fruits' },
  { name: 'watermelon', category: 'fruits' },
  { name: 'cantaloupe', category: 'fruits' },
  { name: 'honeydew', category: 'fruits' },
  { name: 'pear', category: 'fruits' },
  { name: 'peach', category: 'fruits' },
  { name: 'plum', category: 'fruits' },
  { name: 'fig', category: 'fruits' },
  { name: 'date', category: 'fruits' },
  { name: 'papaya', category: 'fruits' },
  { name: 'guava', category: 'fruits' },
  { name: 'lychee', category: 'fruits' },
  { name: 'dragon fruit', category: 'fruits' },
  { name: 'passion fruit', category: 'fruits' },
  { name: 'pomegranate', category: 'fruits' },
  { name: 'coconut', category: 'fruits' },
  { name: 'avocado', category: 'fruits' },

  // grains & flours
  { name: 'white rice', category: 'grains' },
  { name: 'brown rice', category: 'grains' },
  { name: 'jasmine rice', category: 'grains' },
  { name: 'basmati rice', category: 'grains' },
  { name: 'wild rice', category: 'grains' },
  { name: 'quinoa', category: 'grains' },
  { name: 'bulgur', category: 'grains' },
  { name: 'couscous', category: 'grains' },
  { name: 'barley', category: 'grains' },
  { name: 'farro', category: 'grains' },
  { name: 'oats', category: 'grains' },
  { name: 'cornmeal', category: 'grains' },
  { name: 'polenta', category: 'grains' },
  { name: 'wheat berries', category: 'grains' },
  { name: 'millet', category: 'grains' },
  { name: 'rye', category: 'grains' },
  { name: 'buckwheat', category: 'grains' },
  { name: 'semolina', category: 'grains' },
  { name: 'all-purpose flour', category: 'grains' },
  { name: 'whole wheat flour', category: 'grains' },
  { name: 'almond flour', category: 'grains' },
  { name: 'chickpea flour', category: 'grains' },
  { name: 'rice flour', category: 'grains' },
  { name: 'corn flour', category: 'grains' },
  { name: 'tapioca starch', category: 'grains' },
  { name: 'potato starch', category: 'grains' },

  // dairy & alternatives
  { name: 'cow milk', category: 'dairy' },
  { name: 'goat milk', category: 'dairy' },
  { name: 'sheep milk', category: 'dairy' },
  { name: 'cream', category: 'dairy' },
  { name: 'heavy cream', category: 'dairy' },
  { name: 'half-and-half', category: 'dairy' },
  { name: 'butter', category: 'dairy' },
  { name: 'ghee', category: 'dairy' },
  { name: 'cheddar cheese', category: 'dairy' },
  { name: 'mozzarella cheese', category: 'dairy' },
  { name: 'feta cheese', category: 'dairy' },
  { name: 'parmesan cheese', category: 'dairy' },
  { name: 'yogurt', category: 'dairy' },
  { name: 'sour cream', category: 'dairy' },
  { name: 'buttermilk', category: 'dairy' },
  { name: 'condensed milk', category: 'dairy' },
  { name: 'evaporated milk', category: 'dairy' },
  { name: 'oat milk', category: 'dairy' },
  { name: 'almond milk', category: 'dairy' },
  { name: 'soy milk', category: 'dairy' },
  { name: 'coconut milk', category: 'dairy' },
  { name: 'rice milk', category: 'dairy' },
  { name: 'vegan butter', category: 'dairy' },
  { name: 'vegan cheese', category: 'dairy' },

  // spices & herbs
  { name: 'black pepper', category: 'spices' },
  { name: 'white pepper', category: 'spices' },
  { name: 'sichuan pepper', category: 'spices' },
  { name: 'paprika', category: 'spices' },
  { name: 'chili powder', category: 'spices' },
  { name: 'cayenne', category: 'spices' },
  { name: 'turmeric', category: 'spices' },
  { name: 'cumin', category: 'spices' },
  { name: 'coriander', category: 'spices' },
  { name: 'mustard seeds', category: 'spices' },
  { name: 'fenugreek', category: 'spices' },
  { name: 'garam masala', category: 'spices' },
  { name: 'curry powder', category: 'spices' },
  { name: 'cinnamon', category: 'spices' },
  { name: 'nutmeg', category: 'spices' },
  { name: 'clove', category: 'spices' },
  { name: 'cardamom', category: 'spices' },
  { name: 'allspice', category: 'spices' },
  { name: 'bay leaf', category: 'spices' },
  { name: 'star anise', category: 'spices' },
  { name: 'dill', category: 'spices' },
  { name: 'parsley', category: 'spices' },
  { name: 'basil', category: 'spices' },
  { name: 'oregano', category: 'spices' },
  { name: 'thyme', category: 'spices' },
  { name: 'rosemary', category: 'spices' },
  { name: 'sage', category: 'spices' },
  { name: 'mint', category: 'spices' },
  { name: 'chives', category: 'spices' },
  { name: 'tarragon', category: 'spices' },
  { name: 'za\'atar', category: 'spices' },
  { name: 'sumac', category: 'spices' },
  { name: 'ginger', category: 'spices' },

  // condiments & oils
  { name: 'olive oil', category: 'condiments' },
  { name: 'vegetable oil', category: 'condiments' },
  { name: 'sesame oil', category: 'condiments' },
  { name: 'soy sauce', category: 'condiments' },
  { name: 'tamari', category: 'condiments' },
  { name: 'fish sauce', category: 'condiments' },
  { name: 'oyster sauce', category: 'condiments' },
  { name: 'hoisin', category: 'condiments' },
  { name: 'teriyaki', category: 'condiments' },
  { name: 'worcestershire sauce', category: 'condiments' },
  { name: 'balsamic vinegar', category: 'condiments' },
  { name: 'white vinegar', category: 'condiments' },
  { name: 'apple cider vinegar', category: 'condiments' },
  { name: 'rice vinegar', category: 'condiments' },
  { name: 'ketchup', category: 'condiments' },
  { name: 'mustard', category: 'condiments' },
  { name: 'mayonnaise', category: 'condiments' },
  { name: 'hot sauce', category: 'condiments' },
  { name: 'sriracha', category: 'condiments' },
  { name: 'tabasco', category: 'condiments' },
  { name: 'bbq sauce', category: 'condiments' },
  { name: 'tahini', category: 'condiments' },
  { name: 'harissa', category: 'condiments' },
  { name: 'pesto', category: 'condiments' },
  { name: 'miso', category: 'condiments' },
  { name: 'peanut butter', category: 'condiments' },
  { name: 'jam', category: 'condiments' },
  { name: 'honey', category: 'condiments' },
  { name: 'maple syrup', category: 'condiments' },
  { name: 'molasses', category: 'condiments' },

  // breads
  { name: 'white bread', category: 'breads' },
  { name: 'whole wheat bread', category: 'breads' },
  { name: 'sourdough', category: 'breads' },
  { name: 'baguette', category: 'breads' },
  { name: 'pita', category: 'breads' },
  { name: 'naan', category: 'breads' },
  { name: 'tortilla', category: 'breads' },
  { name: 'roti', category: 'breads' },
  { name: 'english muffin', category: 'breads' },
  { name: 'croissant', category: 'breads' },
  { name: 'brioche', category: 'breads' },
  { name: 'bagel', category: 'breads' },
  { name: 'pizza dough', category: 'breads' },
  { name: 'puff pastry', category: 'breads' },
  { name: 'phyllo dough', category: 'breads' },

  // pantry
  { name: 'white sugar', category: 'pantry' },
  { name: 'brown sugar', category: 'pantry' },
  { name: 'powdered sugar', category: 'pantry' },
  { name: 'baking powder', category: 'pantry' },
  { name: 'baking soda', category: 'pantry' },
  { name: 'cornstarch', category: 'pantry' },
  { name: 'yeast', category: 'pantry' },
  { name: 'cocoa powder', category: 'pantry' },
  { name: 'chocolate chips', category: 'pantry' },
  { name: 'dark chocolate', category: 'pantry' },
  { name: 'milk chocolate', category: 'pantry' },
  { name: 'canned tomatoes', category: 'pantry' },
  { name: 'black beans', category: 'pantry' },
  { name: 'kidney beans', category: 'pantry' },
  { name: 'chickpeas', category: 'pantry' },
  { name: 'lentils', category: 'pantry' },
  { name: 'chicken broth', category: 'pantry' },
  { name: 'beef broth', category: 'pantry' },
  { name: 'vegetable broth', category: 'pantry' },
  { name: 'spaghetti', category: 'pantry' },
  { name: 'penne', category: 'pantry' },
  { name: 'fusilli', category: 'pantry' },
  { name: 'ramen', category: 'pantry' },
  { name: 'instant noodles', category: 'pantry' },
  { name: 'split peas', category: 'pantry' },
  { name: 'almonds', category: 'pantry' },
  { name: 'walnuts', category: 'pantry' },
  { name: 'pistachios', category: 'pantry' },
  { name: 'chia seeds', category: 'pantry' },
  { name: 'flax seeds', category: 'pantry' },
  { name: 'sesame seeds', category: 'pantry' },
  { name: 'sunflower seeds', category: 'pantry' },
  { name: 'raisins', category: 'pantry' },
  { name: 'coconut flakes', category: 'pantry' },
  { name: 'canned fruit', category: 'pantry' },

  // drinks
  { name: 'sparkling water', category: 'drinks' },
  { name: 'soda', category: 'drinks' },
  { name: 'coffee', category: 'drinks' },
  { name: 'black tea', category: 'drinks' },
  { name: 'green tea', category: 'drinks' },
  { name: 'herbal tea', category: 'drinks' },
  { name: 'coconut water', category: 'drinks' },
  { name: 'orange juice', category: 'drinks' },
  { name: 'apple juice', category: 'drinks' },
  { name: 'cranberry juice', category: 'drinks' },
  { name: 'red wine', category: 'drinks' },
  { name: 'white wine', category: 'drinks' },
  { name: 'beer', category: 'drinks' },
  { name: 'vodka', category: 'drinks' },
  { name: 'whiskey', category: 'drinks' },
  { name: 'rum', category: 'drinks' },
  { name: 'gin', category: 'drinks' },

  // snacks
  { name: 'potato chips', category: 'snacks' },
  { name: 'tortilla chips', category: 'snacks' },
  { name: 'popcorn', category: 'snacks' },
  { name: 'pretzels', category: 'snacks' },
  { name: 'crackers', category: 'snacks' },
  { name: 'granola', category: 'snacks' },
  { name: 'trail mix', category: 'snacks' },
  { name: 'energy bar', category: 'snacks' },
  { name: 'protein powder', category: 'snacks' },
  { name: 'seaweed snacks', category: 'snacks' },
  { name: 'pickles', category: 'snacks' },
  { name: 'olives', category: 'snacks' },
  { name: 'jerky', category: 'snacks' }
];

interface IngredientPickerProps {
  selectedIngredients: string[];
  onIngredientToggle: (ingredient: string) => void;
}

const IngredientPicker = ({ selectedIngredients, onIngredientToggle }: IngredientPickerProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const filteredIngredients = ingredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [...new Set(ingredients.map(i => i.category))];

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const getIngredientsForCategory = (category: string) => {
    return filteredIngredients.filter(i => i.category === category);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          what do you have?
        </h2>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-input border-border rounded-full h-12 text-base"
          />
        </div>

        {searchTerm ? (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {filteredIngredients.map((ingredient) => (
                <button
                  key={ingredient.name}
                  className={`ingredient-pill ${
                    selectedIngredients.includes(ingredient.name) ? 'selected' : ''
                  }`}
                  onClick={() => onIngredientToggle(ingredient.name)}
                >
                  {ingredient.name}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {categories.map((category) => (
              <div key={category} className="space-y-3">
                <button
                  onClick={() => toggleCategory(category)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h3 className="text-lg font-medium">{category}</h3>
                  <span className="text-muted-foreground">
                    {expandedCategories.includes(category) ? '−' : '+'}
                  </span>
                </button>
                
                {expandedCategories.includes(category) && (
                  <div className="flex flex-wrap gap-2 pl-4">
                    {getIngredientsForCategory(category).map((ingredient) => (
                      <button
                        key={ingredient.name}
                        className={`ingredient-pill ${
                          selectedIngredients.includes(ingredient.name) ? 'selected' : ''
                        }`}
                        onClick={() => onIngredientToggle(ingredient.name)}
                      >
                        {ingredient.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {selectedIngredients.length > 0 && (
          <div className="mt-8 p-4 bg-card rounded-lg border">
            <h4 className="font-medium mb-3">selected ingredients ({selectedIngredients.length}):</h4>
            <div className="flex flex-wrap gap-2">
              {selectedIngredients.map((ingredient) => (
                <span
                  key={ingredient}
                  className="ingredient-pill selected cursor-default"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IngredientPicker;