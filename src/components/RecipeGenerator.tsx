import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Users } from 'lucide-react';

interface Recipe {
  title: string;
  description: string;
  prepTime: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
  moodNote: string;
}

interface RecipeGeneratorProps {
  mood: string;
  type: string;
  ingredients: string[];
  onBack: () => void;
}

const RecipeGenerator = ({ mood, type, ingredients, onBack }: RecipeGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    generateRecipe();
  }, [mood, type, ingredients]);

  const generateRecipe = async () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock recipe generation based on mood, type and ingredients
    const mockRecipe = createMockRecipe(mood, type, ingredients);
    setRecipe(mockRecipe);
    setIsGenerating(false);
  };

  const createMockRecipe = (mood: string, type: string, ingredients: string[]): Recipe => {
    const moodAdjectives: Record<string, string[]> = {
      'Tired': ['comforting', 'easy', 'nourishing'],
      'Cozy': ['warm', 'soothing', 'hearty'],
      'Creative': ['experimental', 'colorful', 'unique'],
      'Sad': ['healing', 'soul-warming', 'gentle'],
      'Hungover': ['restorative', 'gentle', 'hydrating'],
      'Energetic': ['vibrant', 'bold', 'exciting'],
      'Calm': ['peaceful', 'light', 'balanced'],
      'Spicy': ['fiery', 'intense', 'bold'],
      'Fresh': ['bright', 'clean', 'crisp'],
      'Indulgent': ['rich', 'decadent', 'luxurious']
    };

    const adjective = moodAdjectives[mood]?.[0] || 'delicious';
    const mainIngredient = ingredients[0] || 'mystery ingredient';

    return {
      title: `${adjective} ${mainIngredient} ${type.toLowerCase()}`,
      description: `A ${adjective} ${type.toLowerCase()} crafted from your available ingredients to match your ${mood.toLowerCase()} mood.`,
      prepTime: '15-20 mins',
      servings: '2-3 people',
      ingredients: ingredients.slice(0, 6), // Use up to 6 ingredients
      instructions: [
        `Begin by preparing your ${mainIngredient} - this will be the star of our ${adjective} creation.`,
        `Combine with ${ingredients[1] || 'your second ingredient'} to build the foundation of flavor.`,
        `Season thoughtfully with ${ingredients.includes('salt') ? 'salt' : 'your chosen seasonings'} and ${ingredients.includes('pepper') ? 'pepper' : 'available spices'}.`,
        `Cook with intention, letting the ${mood.toLowerCase()} energy guide your technique.`,
        `Taste and adjust - trust your instincts and the mood you're in.`,
        `Serve with gratitude and enjoy this moment of nourishment.`
      ],
      moodNote: getMoodNote(mood)
    };
  };

  const getMoodNote = (mood: string): string => {
    const notes: Record<string, string> = {
      'Tired': 'This dish is designed to comfort without overwhelming. Simple, nourishing, and exactly what you need.',
      'Cozy': 'Wrap yourself in the warmth of this creation. Perfect for quiet moments and gentle self-care.',
      'Creative': 'Let your culinary imagination run wild. This is your canvas - make it uniquely yours.',
      'Sad': 'Food as medicine for the soul. Take your time, breathe deeply, and let this nourish you.',
      'Hungover': 'Gentle recovery fuel. Stay hydrated and be kind to yourself as you rebuild.',
      'Energetic': 'Bold flavors for bold moods. Let this fuel your next adventure.',
      'Calm': 'Simple, peaceful cooking for a centered mind. Find your rhythm in the process.',
      'Spicy': 'Turn up the heat and embrace the intensity. Let those endorphins flow.',
      'Fresh': 'Clean, bright flavors to reset and refresh. A new beginning on a plate.',
      'Indulgent': 'Sometimes we deserve luxury. Savor every bite without guilt.'
    };
    return notes[mood] || 'Trust the process and enjoy the journey.';
  };

  if (isGenerating) {
    return (
      <div className="w-full max-w-2xl mx-auto px-6">
        <div className="text-center space-y-8">
          <div className="animate-pulse">
            <div className="w-12 h-12 bg-primary/20 rounded-full mx-auto mb-4"></div>
            <h2 className="text-2xl font-semibold mb-2">crafting your recipe...</h2>
            <p className="text-muted-foreground">
              considering your {mood.toLowerCase()} mood, {type.toLowerCase()} type, and {ingredients.length} ingredients
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) return null;

  return (
    <div className="w-full max-w-3xl mx-auto px-6">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          back to ingredients
        </Button>
      </div>

      <Card className="p-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold capitalize">
            {recipe.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {recipe.description}
          </p>
          
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {recipe.prepTime}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {recipe.servings}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">ingredients</h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">instructions</h3>
            <ol className="space-y-3">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="text-sm leading-relaxed">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-6">
          <h4 className="font-medium mb-2 text-center">mood note</h4>
          <p className="text-sm text-center text-muted-foreground italic">
            {recipe.moodNote}
          </p>
        </div>

        <div className="text-center">
          <Button onClick={onBack} className="generate-button">
            create another recipe
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RecipeGenerator;