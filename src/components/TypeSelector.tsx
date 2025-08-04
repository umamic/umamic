interface TypeSelectorProps {
  selectedType: string | null;
  onTypeSelect: (type: string) => void;
}

const types = [
  { label: 'Food', emoji: '🍽️' },
  { label: 'Drink', emoji: '🥤' },
  { label: 'Dessert', emoji: '🍰' },
  { label: 'Snack', emoji: '🍪' },
  { label: 'Appetizer', emoji: '🥗' }
];

const TypeSelector = ({ selectedType, onTypeSelect }: TypeSelectorProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          what are you making?
        </h2>
        
        <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
          {types.map((type) => (
            <button
              key={type.label}
              className={`mood-chip ${selectedType === type.label ? 'active' : ''}`}
              onClick={() => onTypeSelect(type.label)}
            >
              <span className="text-2xl mr-2">{type.emoji}</span>
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypeSelector;