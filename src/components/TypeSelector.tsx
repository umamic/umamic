import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TypeSelectorProps {
  selectedType: string | null;
  onTypeSelect: (type: string) => void;
}

const types = [
  { 
    label: 'main', 
    emoji: '🍔',
    expectedIngredients: 'we expect you to have: salt, pepper, onion, garlic, oil'
  },
  { 
    label: 'drink', 
    emoji: '🥤',
    expectedIngredients: 'we expect you to have: ice, water, sugar, lemon, milk'
  },
  { 
    label: 'dessert', 
    emoji: '🍰',
    expectedIngredients: 'we expect you to have: butter, sugar, flour, eggs, vanilla'
  },
  { 
    label: 'snack', 
    emoji: '🍪',
    expectedIngredients: 'we expect you to have: bread, cheese, crackers, nuts, fruit'
  },
  { 
    label: 'appetizer', 
    emoji: '🥗',
    expectedIngredients: 'we expect you to have: olive oil, lemon, herbs, tomatoes, cheese'
  }
];

const TypeSelector = ({ selectedType, onTypeSelect }: TypeSelectorProps) => {
  return (
    <TooltipProvider>
      <div className="w-full max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            what are you making?
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {types.map((type) => (
              <Tooltip key={type.label}>
                <TooltipTrigger asChild>
                  <button
                    className={`mood-chip ${selectedType === type.label ? 'active' : ''}`}
                    onClick={() => onTypeSelect(type.label)}
                  >
                    <span className="text-2xl mr-2">{type.emoji}</span>
                    <span>{type.label}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">{type.expectedIngredients}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default TypeSelector;