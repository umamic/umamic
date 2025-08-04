import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface Ingredient {
  name: string;
  category: string;
}

const ingredients: Ingredient[] = [
  // Proteins
  { name: 'chicken breast', category: 'Proteins' },
  { name: 'chicken thigh', category: 'Proteins' },
  { name: 'chicken wings', category: 'Proteins' },
  { name: 'ground chicken', category: 'Proteins' },
  { name: 'turkey', category: 'Proteins' },
  { name: 'duck', category: 'Proteins' },
  { name: 'pork chops', category: 'Proteins' },
  { name: 'pork belly', category: 'Proteins' },
  { name: 'pork shoulder', category: 'Proteins' },
  { name: 'ground pork', category: 'Proteins' },
  { name: 'beef steak', category: 'Proteins' },
  { name: 'ground beef', category: 'Proteins' },
  { name: 'beef brisket', category: 'Proteins' },
  { name: 'short ribs', category: 'Proteins' },
  { name: 'lamb chops', category: 'Proteins' },
  { name: 'ground lamb', category: 'Proteins' },
  { name: 'lamb leg', category: 'Proteins' },
  { name: 'goat', category: 'Proteins' },
  { name: 'veal', category: 'Proteins' },
  { name: 'salmon', category: 'Proteins' },
  { name: 'cod', category: 'Proteins' },
  { name: 'tuna', category: 'Proteins' },
  { name: 'halibut', category: 'Proteins' },
  { name: 'sardine', category: 'Proteins' },
  { name: 'shrimp', category: 'Proteins' },
  { name: 'crab', category: 'Proteins' },
  { name: 'lobster', category: 'Proteins' },
  { name: 'mussels', category: 'Proteins' },
  { name: 'clams', category: 'Proteins' },
  { name: 'scallops', category: 'Proteins' },
  { name: 'squid', category: 'Proteins' },
  { name: 'octopus', category: 'Proteins' },
  { name: 'tofu', category: 'Proteins' },
  { name: 'tempeh', category: 'Proteins' },
  { name: 'seitan', category: 'Proteins' },
  { name: 'eggs', category: 'Proteins' },
  { name: 'paneer', category: 'Proteins' },
  { name: 'halloumi', category: 'Proteins' },
  { name: 'plant-based meat', category: 'Proteins' },

  // Vegetables
  { name: 'carrot', category: 'Vegetables' },
  { name: 'potato', category: 'Vegetables' },
  { name: 'sweet potato', category: 'Vegetables' },
  { name: 'onion', category: 'Vegetables' },
  { name: 'garlic', category: 'Vegetables' },
  { name: 'bell pepper', category: 'Vegetables' },
  { name: 'broccoli', category: 'Vegetables' },
  { name: 'cauliflower', category: 'Vegetables' },
  { name: 'spinach', category: 'Vegetables' },
  { name: 'kale', category: 'Vegetables' },
  { name: 'cabbage', category: 'Vegetables' },
  { name: 'zucchini', category: 'Vegetables' },
  { name: 'eggplant', category: 'Vegetables' },
  { name: 'tomato', category: 'Vegetables' },
  { name: 'cucumber', category: 'Vegetables' },
  { name: 'celery', category: 'Vegetables' },
  { name: 'leek', category: 'Vegetables' },
  { name: 'fennel', category: 'Vegetables' },
  { name: 'radish', category: 'Vegetables' },
  { name: 'beet', category: 'Vegetables' },
  { name: 'green beans', category: 'Vegetables' },
  { name: 'snow peas', category: 'Vegetables' },
  { name: 'artichoke', category: 'Vegetables' },
  { name: 'okra', category: 'Vegetables' },
  { name: 'chayote', category: 'Vegetables' },
  { name: 'corn', category: 'Vegetables' },
  { name: 'turnip', category: 'Vegetables' },
  { name: 'shiitake mushroom', category: 'Vegetables' },
  { name: 'button mushroom', category: 'Vegetables' },
  { name: 'cremini mushroom', category: 'Vegetables' },
  { name: 'oyster mushroom', category: 'Vegetables' },
  { name: 'enoki mushroom', category: 'Vegetables' },

  // Fruits
  { name: 'apple', category: 'Fruits' },
  { name: 'banana', category: 'Fruits' },
  { name: 'orange', category: 'Fruits' },
  { name: 'lemon', category: 'Fruits' },
  { name: 'lime', category: 'Fruits' },
  { name: 'grapefruit', category: 'Fruits' },
  { name: 'mango', category: 'Fruits' },
  { name: 'pineapple', category: 'Fruits' },
  { name: 'strawberry', category: 'Fruits' },
  { name: 'raspberry', category: 'Fruits' },
  { name: 'blueberry', category: 'Fruits' },
  { name: 'blackberry', category: 'Fruits' },
  { name: 'cherry', category: 'Fruits' },
  { name: 'grape', category: 'Fruits' },
  { name: 'kiwi', category: 'Fruits' },
  { name: 'watermelon', category: 'Fruits' },
  { name: 'cantaloupe', category: 'Fruits' },
  { name: 'honeydew', category: 'Fruits' },
  { name: 'pear', category: 'Fruits' },
  { name: 'peach', category: 'Fruits' },
  { name: 'plum', category: 'Fruits' },
  { name: 'fig', category: 'Fruits' },
  { name: 'date', category: 'Fruits' },
  { name: 'papaya', category: 'Fruits' },
  { name: 'guava', category: 'Fruits' },
  { name: 'lychee', category: 'Fruits' },
  { name: 'dragon fruit', category: 'Fruits' },
  { name: 'passion fruit', category: 'Fruits' },
  { name: 'pomegranate', category: 'Fruits' },
  { name: 'coconut', category: 'Fruits' },
  { name: 'avocado', category: 'Fruits' },

  // Grains & Flours
  { name: 'white rice', category: 'Grains' },
  { name: 'brown rice', category: 'Grains' },
  { name: 'jasmine rice', category: 'Grains' },
  { name: 'basmati rice', category: 'Grains' },
  { name: 'wild rice', category: 'Grains' },
  { name: 'quinoa', category: 'Grains' },
  { name: 'bulgur', category: 'Grains' },
  { name: 'couscous', category: 'Grains' },
  { name: 'barley', category: 'Grains' },
  { name: 'farro', category: 'Grains' },
  { name: 'oats', category: 'Grains' },
  { name: 'cornmeal', category: 'Grains' },
  { name: 'polenta', category: 'Grains' },
  { name: 'wheat berries', category: 'Grains' },
  { name: 'millet', category: 'Grains' },
  { name: 'rye', category: 'Grains' },
  { name: 'buckwheat', category: 'Grains' },
  { name: 'semolina', category: 'Grains' },
  { name: 'all-purpose flour', category: 'Grains' },
  { name: 'whole wheat flour', category: 'Grains' },
  { name: 'almond flour', category: 'Grains' },
  { name: 'chickpea flour', category: 'Grains' },
  { name: 'rice flour', category: 'Grains' },
  { name: 'corn flour', category: 'Grains' },
  { name: 'tapioca starch', category: 'Grains' },
  { name: 'potato starch', category: 'Grains' },

  // Dairy & Alternatives
  { name: 'cow milk', category: 'Dairy' },
  { name: 'goat milk', category: 'Dairy' },
  { name: 'sheep milk', category: 'Dairy' },
  { name: 'cream', category: 'Dairy' },
  { name: 'heavy cream', category: 'Dairy' },
  { name: 'half-and-half', category: 'Dairy' },
  { name: 'butter', category: 'Dairy' },
  { name: 'ghee', category: 'Dairy' },
  { name: 'cheddar cheese', category: 'Dairy' },
  { name: 'mozzarella cheese', category: 'Dairy' },
  { name: 'feta cheese', category: 'Dairy' },
  { name: 'parmesan cheese', category: 'Dairy' },
  { name: 'yogurt', category: 'Dairy' },
  { name: 'sour cream', category: 'Dairy' },
  { name: 'buttermilk', category: 'Dairy' },
  { name: 'condensed milk', category: 'Dairy' },
  { name: 'evaporated milk', category: 'Dairy' },
  { name: 'oat milk', category: 'Dairy' },
  { name: 'almond milk', category: 'Dairy' },
  { name: 'soy milk', category: 'Dairy' },
  { name: 'coconut milk', category: 'Dairy' },
  { name: 'rice milk', category: 'Dairy' },
  { name: 'vegan butter', category: 'Dairy' },
  { name: 'vegan cheese', category: 'Dairy' },

  // Spices & Herbs
  { name: 'black pepper', category: 'Spices' },
  { name: 'white pepper', category: 'Spices' },
  { name: 'sichuan pepper', category: 'Spices' },
  { name: 'paprika', category: 'Spices' },
  { name: 'chili powder', category: 'Spices' },
  { name: 'cayenne', category: 'Spices' },
  { name: 'turmeric', category: 'Spices' },
  { name: 'cumin', category: 'Spices' },
  { name: 'coriander', category: 'Spices' },
  { name: 'mustard seeds', category: 'Spices' },
  { name: 'fenugreek', category: 'Spices' },
  { name: 'garam masala', category: 'Spices' },
  { name: 'curry powder', category: 'Spices' },
  { name: 'cinnamon', category: 'Spices' },
  { name: 'nutmeg', category: 'Spices' },
  { name: 'clove', category: 'Spices' },
  { name: 'cardamom', category: 'Spices' },
  { name: 'allspice', category: 'Spices' },
  { name: 'bay leaf', category: 'Spices' },
  { name: 'star anise', category: 'Spices' },
  { name: 'dill', category: 'Spices' },
  { name: 'parsley', category: 'Spices' },
  { name: 'basil', category: 'Spices' },
  { name: 'oregano', category: 'Spices' },
  { name: 'thyme', category: 'Spices' },
  { name: 'rosemary', category: 'Spices' },
  { name: 'sage', category: 'Spices' },
  { name: 'mint', category: 'Spices' },
  { name: 'chives', category: 'Spices' },
  { name: 'tarragon', category: 'Spices' },
  { name: 'za\'atar', category: 'Spices' },
  { name: 'sumac', category: 'Spices' },
  { name: 'ginger', category: 'Spices' },

  // Condiments, Sauces & Oils
  { name: 'olive oil', category: 'Condiments' },
  { name: 'vegetable oil', category: 'Condiments' },
  { name: 'sesame oil', category: 'Condiments' },
  { name: 'soy sauce', category: 'Condiments' },
  { name: 'tamari', category: 'Condiments' },
  { name: 'fish sauce', category: 'Condiments' },
  { name: 'oyster sauce', category: 'Condiments' },
  { name: 'hoisin', category: 'Condiments' },
  { name: 'teriyaki', category: 'Condiments' },
  { name: 'worcestershire sauce', category: 'Condiments' },
  { name: 'balsamic vinegar', category: 'Condiments' },
  { name: 'white vinegar', category: 'Condiments' },
  { name: 'apple cider vinegar', category: 'Condiments' },
  { name: 'rice vinegar', category: 'Condiments' },
  { name: 'ketchup', category: 'Condiments' },
  { name: 'mustard', category: 'Condiments' },
  { name: 'mayonnaise', category: 'Condiments' },
  { name: 'hot sauce', category: 'Condiments' },
  { name: 'sriracha', category: 'Condiments' },
  { name: 'tabasco', category: 'Condiments' },
  { name: 'bbq sauce', category: 'Condiments' },
  { name: 'tahini', category: 'Condiments' },
  { name: 'harissa', category: 'Condiments' },
  { name: 'pesto', category: 'Condiments' },
  { name: 'miso', category: 'Condiments' },
  { name: 'peanut butter', category: 'Condiments' },
  { name: 'jam', category: 'Condiments' },
  { name: 'honey', category: 'Condiments' },
  { name: 'maple syrup', category: 'Condiments' },
  { name: 'molasses', category: 'Condiments' },

  // Breads & Bakery
  { name: 'white bread', category: 'Breads' },
  { name: 'whole wheat bread', category: 'Breads' },
  { name: 'sourdough', category: 'Breads' },
  { name: 'baguette', category: 'Breads' },
  { name: 'pita', category: 'Breads' },
  { name: 'naan', category: 'Breads' },
  { name: 'tortilla', category: 'Breads' },
  { name: 'roti', category: 'Breads' },
  { name: 'english muffin', category: 'Breads' },
  { name: 'croissant', category: 'Breads' },
  { name: 'brioche', category: 'Breads' },
  { name: 'bagel', category: 'Breads' },
  { name: 'pizza dough', category: 'Breads' },
  { name: 'puff pastry', category: 'Breads' },
  { name: 'phyllo dough', category: 'Breads' },

  // Pantry Staples
  { name: 'white sugar', category: 'Pantry' },
  { name: 'brown sugar', category: 'Pantry' },
  { name: 'powdered sugar', category: 'Pantry' },
  { name: 'baking powder', category: 'Pantry' },
  { name: 'baking soda', category: 'Pantry' },
  { name: 'cornstarch', category: 'Pantry' },
  { name: 'yeast', category: 'Pantry' },
  { name: 'cocoa powder', category: 'Pantry' },
  { name: 'chocolate chips', category: 'Pantry' },
  { name: 'dark chocolate', category: 'Pantry' },
  { name: 'milk chocolate', category: 'Pantry' },
  { name: 'canned tomatoes', category: 'Pantry' },
  { name: 'black beans', category: 'Pantry' },
  { name: 'kidney beans', category: 'Pantry' },
  { name: 'chickpeas', category: 'Pantry' },
  { name: 'lentils', category: 'Pantry' },
  { name: 'chicken broth', category: 'Pantry' },
  { name: 'beef broth', category: 'Pantry' },
  { name: 'vegetable broth', category: 'Pantry' },
  { name: 'spaghetti', category: 'Pantry' },
  { name: 'penne', category: 'Pantry' },
  { name: 'fusilli', category: 'Pantry' },
  { name: 'ramen', category: 'Pantry' },
  { name: 'instant noodles', category: 'Pantry' },
  { name: 'split peas', category: 'Pantry' },
  { name: 'almonds', category: 'Pantry' },
  { name: 'walnuts', category: 'Pantry' },
  { name: 'pistachios', category: 'Pantry' },
  { name: 'chia seeds', category: 'Pantry' },
  { name: 'flax seeds', category: 'Pantry' },
  { name: 'sesame seeds', category: 'Pantry' },
  { name: 'sunflower seeds', category: 'Pantry' },
  { name: 'raisins', category: 'Pantry' },
  { name: 'coconut flakes', category: 'Pantry' },
  { name: 'canned fruit', category: 'Pantry' },

  // Drinks & Liquids
  { name: 'sparkling water', category: 'Drinks' },
  { name: 'soda', category: 'Drinks' },
  { name: 'coffee', category: 'Drinks' },
  { name: 'black tea', category: 'Drinks' },
  { name: 'green tea', category: 'Drinks' },
  { name: 'herbal tea', category: 'Drinks' },
  { name: 'coconut water', category: 'Drinks' },
  { name: 'orange juice', category: 'Drinks' },
  { name: 'apple juice', category: 'Drinks' },
  { name: 'cranberry juice', category: 'Drinks' },
  { name: 'red wine', category: 'Drinks' },
  { name: 'white wine', category: 'Drinks' },
  { name: 'beer', category: 'Drinks' },
  { name: 'vodka', category: 'Drinks' },
  { name: 'whiskey', category: 'Drinks' },
  { name: 'rum', category: 'Drinks' },
  { name: 'gin', category: 'Drinks' },

  // Snacks & Misc
  { name: 'potato chips', category: 'Snacks' },
  { name: 'tortilla chips', category: 'Snacks' },
  { name: 'popcorn', category: 'Snacks' },
  { name: 'pretzels', category: 'Snacks' },
  { name: 'crackers', category: 'Snacks' },
  { name: 'granola', category: 'Snacks' },
  { name: 'trail mix', category: 'Snacks' },
  { name: 'energy bar', category: 'Snacks' },
  { name: 'protein powder', category: 'Snacks' },
  { name: 'seaweed snacks', category: 'Snacks' },
  { name: 'pickles', category: 'Snacks' },
  { name: 'olives', category: 'Snacks' },
  { name: 'jerky', category: 'Snacks' }
];

interface IngredientPickerProps {
  selectedIngredients: string[];
  onIngredientToggle: (ingredient: string) => void;
}

const IngredientPicker = ({ selectedIngredients, onIngredientToggle }: IngredientPickerProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Pantry', 'Proteins']);

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
            <h4 className="font-medium mb-3">Selected ingredients ({selectedIngredients.length}):</h4>
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