import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Users, ChefHat, Star, Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Recipe {
  title: string;
  description: string;
  prepTime: string;
  cookTime?: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
  moodNote: string;
  calories?: number;
  proteins?: number;
  carbs?: number;
}


interface RecipeGeneratorProps {
  mood: string;
  type: string;
  ingredients: string[];
  onBack: () => void;
}

const RecipeGenerator = ({ mood, type, ingredients, onBack }: RecipeGeneratorProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddingToNutrition, setIsAddingToNutrition] = useState(false);

  useEffect(() => {
    generateRecipe();
  }, [mood, type, ingredients]);

  const generateRecipe = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      console.log('Calling recipe generation with:', { mood, type, ingredients });
      
      const { data, error } = await supabase.functions.invoke('generate-recipe', {
        body: { mood, type, ingredients }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to generate recipe');
      }

      console.log('Received recipe data:', data);

      if (data?.recipes && Array.isArray(data.recipes)) {
        setRecipes(data.recipes as Recipe[]);
        setSelectedRecipeIndex(0);
      } else if (data?.error) {
        setError(data.error);
        setRecipes([]);
      } else {
        throw new Error('Invalid response format from recipe generator');
      }
    } catch (err) {
      console.error('Error generating recipe:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setRecipes([]);
    }
    
    setIsGenerating(false);
  };

  const handleAddToFavorites = async () => {
    if (!user || !currentRecipe) return;

    try {
      const { error } = await supabase
        .from('user_recipes')
        .insert({
          user_id: user.id,
          recipe_data: currentRecipe as any,
          calories: currentRecipe.calories || 0,
          proteins: currentRecipe.proteins || 0,
          carbs: currentRecipe.carbs || 0,
          is_favorite: true,
          wants_to_make: false
        });

      if (error) throw error;

      setIsFavorite(true);
      toast({
        title: "Added to favorites!",
        description: "You can find this recipe in your dashboard.",
      });
    } catch (error) {
      console.error('Error adding to favorites:', error);
      toast({
        title: "Error",
        description: "Failed to add recipe to favorites.",
        variant: "destructive"
      });
    }
  };

  const handleSoundsGood = async () => {
    if (!user || !currentRecipe) return;

    setIsAddingToNutrition(true);
    
    try {
      // Add to user recipes
      const { error: recipeError } = await supabase
        .from('user_recipes')
        .insert({
          user_id: user.id,
          recipe_data: currentRecipe as any,
          calories: currentRecipe.calories || 0,
          proteins: currentRecipe.proteins || 0,
          carbs: currentRecipe.carbs || 0,
          is_favorite: false,
          wants_to_make: true
        });

      if (recipeError) throw recipeError;

      // Update daily nutrition
      const today = new Date().toISOString().split('T')[0];
      const { data: existingNutrition, error: fetchError } = await supabase
        .from('daily_nutrition')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .maybeSingle();

      if (fetchError) throw fetchError;

      const newCalories = (existingNutrition?.total_calories || 0) + (currentRecipe.calories || 0);
      const newProteins = parseFloat(String(existingNutrition?.total_proteins || 0)) + (currentRecipe.proteins || 0);
      const newCarbs = parseFloat(String(existingNutrition?.total_carbs || 0)) + (currentRecipe.carbs || 0);

      if (existingNutrition) {
        const { error: updateError } = await supabase
          .from('daily_nutrition')
          .update({
            total_calories: newCalories,
            total_proteins: newProteins,
            total_carbs: newCarbs
          })
          .eq('id', existingNutrition.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('daily_nutrition')
          .insert({
            user_id: user.id,
            date: today,
            total_calories: newCalories,
            total_proteins: newProteins,
            total_carbs: newCarbs
          });

        if (insertError) throw insertError;
      }

      toast({
        title: "Added to your nutrition!",
        description: `Added ${currentRecipe.calories || 0} calories to today's total.`,
      });
    } catch (error) {
      console.error('Error adding to nutrition:', error);
      toast({
        title: "Error",
        description: "Failed to add recipe to nutrition tracking.",
        variant: "destructive"
      });
    } finally {
      setIsAddingToNutrition(false);
    }
  };



  if (isGenerating) {
    return (
      <div className="w-full max-w-2xl mx-auto px-6">
        <div className="text-center space-y-8">
          <div className="animate-pulse">
            <div className="w-12 h-12 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide">whisking magic</h2>
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


  if (error || recipes.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto px-6 text-center">
        <div className="space-y-8">
          <div className="text-6xl mb-4">
            <div className="animate-bounce">🍔</div>
          </div>
          <h2 className="text-2xl font-semibold">no recipe available</h2>
          <p className="text-muted-foreground">
            try again with different ingredients or mood
          </p>
          <Button onClick={onBack} className="generate-button">
            try again
          </Button>
        </div>
      </div>
    );
  }

  const currentRecipe = recipes[selectedRecipeIndex];

  return (
    <div className="w-full max-w-3xl mx-auto px-6">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          back to selection
        </Button>
      </div>

      {/* Recipe selector for multiple recipes */}
      {recipes.length > 1 && (
        <div className="mb-6">
          <div className="flex justify-center gap-2">
            {recipes.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedRecipeIndex(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-md border 
                  ${selectedRecipeIndex === index
                    ? 'bg-card/40 text-foreground border-border/60 shadow'
                    : 'bg-card/25 hover:bg-card/35 text-muted-foreground border-border/40'
                  }`}
              >
                recipe {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      <Card className="p-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">
            {currentRecipe.title.toLowerCase()}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {currentRecipe.description}
          </p>
          
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              prep: {currentRecipe.prepTime}
            </div>
            {currentRecipe.cookTime && (
              <div className="flex items-center gap-1">
                <ChefHat className="w-4 h-4" />
                cook: {currentRecipe.cookTime}
              </div>
            )}
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {currentRecipe.servings}
            </div>
          </div>
          
          {/* Nutritional Information */}
          {currentRecipe.calories && (
            <div className="flex justify-center gap-4 mt-4">
              <Badge variant="secondary" className="text-sm">
                {currentRecipe.calories} cal
              </Badge>
              <Badge variant="secondary" className="text-sm">
                {currentRecipe.proteins}g protein
              </Badge>
              <Badge variant="secondary" className="text-sm">
                {currentRecipe.carbs}g carbs
              </Badge>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">ingredients</h3>
            <ul className="space-y-2">
              {currentRecipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">instructions</h3>
            <ol className="space-y-3">
              {currentRecipe.instructions.map((instruction, index) => (
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
            {currentRecipe.moodNote}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={handleAddToFavorites}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-yellow-500 text-yellow-500' : ''}`} />
            {isFavorite ? 'favorited' : 'add to favorites'}
          </Button>
          
          <Button
            onClick={handleSoundsGood}
            disabled={isAddingToNutrition}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center gap-2"
          >
            <Heart className="w-4 h-4" />
            {isAddingToNutrition ? 'adding...' : 'sounds good!'}
          </Button>
          
          <Button onClick={onBack} variant="outline" className="generate-button">
            create another recipe
          </Button>
        </div>

      </Card>
    </div>
  );
};

export default RecipeGenerator;