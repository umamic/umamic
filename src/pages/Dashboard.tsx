import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Plus, ChefHat, Utensils, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface DailyNutrition {
  total_calories: number;
  total_proteins: number;
  total_carbs: number;
}

interface UserRecipe {
  id: string;
  recipe_data: any;
  calories: number;
  proteins: number;
  carbs: number;
  is_favorite: boolean;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [dailyNutrition, setDailyNutrition] = useState<DailyNutrition>({
    total_calories: 0,
    total_proteins: 0,
    total_carbs: 0
  });
  const [favoriteRecipes, setFavoriteRecipes] = useState<UserRecipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    fetchDashboardData();
  }, [user, navigate]);

  const fetchDashboardData = async () => {
    try {
      // Fetch today's nutrition
      const today = new Date().toISOString().split('T')[0];
      const { data: nutritionData } = await supabase
        .from('daily_nutrition')
        .select('*')
        .eq('user_id', user?.id)
        .eq('date', today)
        .maybeSingle();

      if (nutritionData) {
        setDailyNutrition({
          total_calories: nutritionData.total_calories || 0,
          total_proteins: parseFloat(String(nutritionData.total_proteins)) || 0,
          total_carbs: parseFloat(String(nutritionData.total_carbs)) || 0
        });
      }

      // Fetch favorite recipes
      const { data: recipes } = await supabase
        .from('user_recipes')
        .select('*')
        .eq('user_id', user?.id)
        .eq('is_favorite', true)
        .order('created_at', { ascending: false })
        .limit(5);

      if (recipes) {
        setFavoriteRecipes(recipes);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const handleGenerateRecipe = () => {
    navigate('/start');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/lovable-uploads/0aa5b245-2d2f-47ba-bf18-7796c0f19c17.png"
              alt="umamic logo"
              className="w-24 h-16 object-contain"
            />
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          </div>
          <Button 
            onClick={handleSignOut}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Nutrition Cards - Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                Calories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {dailyNutrition.total_calories}
              </div>
              <p className="text-sm text-muted-foreground mt-1">kcal today</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                Protein
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {Number(dailyNutrition.total_proteins).toFixed(1)}
              </div>
              <p className="text-sm text-muted-foreground mt-1">grams today</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                Carbs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {Number(dailyNutrition.total_carbs).toFixed(1)}
              </div>
              <p className="text-sm text-muted-foreground mt-1">grams today</p>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row - Generate Recipe and Favorites */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Generate Recipe Widget - Takes 2 columns */}
          <Card className="lg:col-span-2 bg-card border-border">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
                <ChefHat className="w-5 h-5" />
                Generate New Recipe
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Ready to cook something delicious? Let's create a new recipe based on your mood and ingredients.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleGenerateRecipe}
                className="w-full h-12 bg-secondary text-secondary-foreground hover:bg-secondary/80 text-lg font-medium"
              >
                <Plus className="w-5 h-5 mr-2" />
                Start Cooking
              </Button>
            </CardContent>
          </Card>

          {/* Favorites Widget */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Favorites
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Your saved recipes
              </CardDescription>
            </CardHeader>
            <CardContent>
              {favoriteRecipes.length > 0 ? (
                <div className="space-y-3">
                  {favoriteRecipes.map((recipe) => (
                    <div 
                      key={recipe.id}
                      className="p-3 rounded-lg bg-accent/50 border border-border cursor-pointer hover:bg-accent/70 transition-colors"
                      onClick={() => navigate(`/recipe/${recipe.id}`)}
                    >
                      <h4 className="font-medium text-foreground truncate">
                        {recipe.recipe_data?.title || 'Untitled Recipe'}
                      </h4>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {recipe.calories} cal
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {recipe.proteins}g protein
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Utensils className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No favorite recipes yet. Start cooking to add some!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;