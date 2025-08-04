import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface Ingredient {
  name: string;
  category: string;
}

const ingredients: Ingredient[] = [
  // Proteins
  { name: 'chicken', category: 'Proteins' },
  { name: 'beef', category: 'Proteins' },
  { name: 'pork', category: 'Proteins' },
  { name: 'salmon', category: 'Proteins' },
  { name: 'shrimp', category: 'Proteins' },
  { name: 'eggs', category: 'Proteins' },
  { name: 'tofu', category: 'Proteins' },
  { name: 'beans', category: 'Proteins' },
  { name: 'lentils', category: 'Proteins' },

  // Vegetables
  { name: 'onion', category: 'Vegetables' },
  { name: 'garlic', category: 'Vegetables' },
  { name: 'tomato', category: 'Vegetables' },
  { name: 'bell pepper', category: 'Vegetables' },
  { name: 'mushrooms', category: 'Vegetables' },
  { name: 'spinach', category: 'Vegetables' },
  { name: 'broccoli', category: 'Vegetables' },
  { name: 'carrot', category: 'Vegetables' },
  { name: 'potato', category: 'Vegetables' },
  { name: 'sweet potato', category: 'Vegetables' },

  // Fruits
  { name: 'lemon', category: 'Fruits' },
  { name: 'lime', category: 'Fruits' },
  { name: 'apple', category: 'Fruits' },
  { name: 'banana', category: 'Fruits' },
  { name: 'orange', category: 'Fruits' },
  { name: 'berries', category: 'Fruits' },
  { name: 'avocado', category: 'Fruits' },

  // Grains & Carbs
  { name: 'rice', category: 'Grains' },
  { name: 'pasta', category: 'Grains' },
  { name: 'bread', category: 'Grains' },
  { name: 'quinoa', category: 'Grains' },
  { name: 'oats', category: 'Grains' },
  { name: 'flour', category: 'Grains' },

  // Dairy
  { name: 'milk', category: 'Dairy' },
  { name: 'cheese', category: 'Dairy' },
  { name: 'butter', category: 'Dairy' },
  { name: 'yogurt', category: 'Dairy' },
  { name: 'cream', category: 'Dairy' },

  // Spices & Herbs
  { name: 'salt', category: 'Spices' },
  { name: 'pepper', category: 'Spices' },
  { name: 'paprika', category: 'Spices' },
  { name: 'cumin', category: 'Spices' },
  { name: 'basil', category: 'Spices' },
  { name: 'oregano', category: 'Spices' },
  { name: 'thyme', category: 'Spices' },
  { name: 'rosemary', category: 'Spices' },
  { name: 'ginger', category: 'Spices' },
  { name: 'turmeric', category: 'Spices' },

  // Pantry Staples
  { name: 'olive oil', category: 'Pantry' },
  { name: 'vinegar', category: 'Pantry' },
  { name: 'soy sauce', category: 'Pantry' },
  { name: 'honey', category: 'Pantry' },
  { name: 'sugar', category: 'Pantry' },
  { name: 'coconut oil', category: 'Pantry' },
  { name: 'sesame oil', category: 'Pantry' },

  // Condiments
  { name: 'hot sauce', category: 'Condiments' },
  { name: 'mustard', category: 'Condiments' },
  { name: 'mayo', category: 'Condiments' },
  { name: 'ketchup', category: 'Condiments' },
  { name: 'sriracha', category: 'Condiments' }
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