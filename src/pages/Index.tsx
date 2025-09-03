import { useState, useEffect } from 'react';
import MoodSelector from '@/components/MoodSelector';
import TypeSelector from '@/components/TypeSelector';
import IngredientPicker from '@/components/IngredientPicker';
import RecipeGenerator from '@/components/RecipeGenerator';
import Header from '@/components/Header';
import ContactFooter from '@/components/ContactFooter';

const Index = () => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [animationStage, setAnimationStage] = useState(0);
  const [showRecipeGenerator, setShowRecipeGenerator] = useState(false);

  useEffect(() => {
    // Start with "before the fun" animation
    const timer = setTimeout(() => setAnimationStage(1), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    // Trigger type selector animation after mood selection
    setTimeout(() => {
      setAnimationStage(2);
    }, 300);
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    // Trigger ingredient picker animation after type selection
    setTimeout(() => {
      setAnimationStage(3);
    }, 300);
  };

  const resetSelection = () => {
    setSelectedMood('');
    setSelectedType('');
    setSelectedIngredients([]);
    setShowRecipeGenerator(false);
    setAnimationStage(1);
  };

  const shouldShowMoodSelector = () => {
    return !showRecipeGenerator;
  };

  const shouldShowTypeSelector = () => {
    return selectedMood && !showRecipeGenerator;
  };

  const shouldShowIngredientPicker = () => {
    return selectedType && !showRecipeGenerator;
  };

  const shouldShowRecipeGenerator = () => {
    return showRecipeGenerator;
  };

  const handleGenerateRecipe = () => {
    setShowRecipeGenerator(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-32">
        <div className="max-w-4xl mx-auto px-6">
          {/* Main Content Container */}
          <div className={`transition-all duration-1000 ease-out ${
            selectedMood && selectedType 
              ? 'text-left' 
              : 'min-h-[60vh] flex flex-col items-center justify-center text-center'
          }`}>

            {/* Mood Selector */}
            {shouldShowMoodSelector() && (
              <div className={`transition-all duration-1000 ${
                animationStage >= 1 
                  ? 'opacity-100 blur-0 translate-y-0' 
                  : 'opacity-0 blur-sm translate-y-10'
              }`} style={{ transitionDelay: animationStage >= 2 ? '0ms' : '800ms' }}>
                <MoodSelector selectedMood={selectedMood} onMoodSelect={handleMoodSelect} />
              </div>
            )}

            {/* Type Selector - Only shows after mood selection */}
            {shouldShowTypeSelector() && (
              <div className={`mt-12 transition-all duration-1000 ease-out ${
                animationStage >= 2
                  ? 'opacity-100 blur-0 translate-y-0' 
                  : 'opacity-0 blur-sm translate-y-12'
              }`}>
                <TypeSelector selectedType={selectedType} onTypeSelect={handleTypeSelect} />
              </div>
            )}
          </div>
          
          {/* Ingredient Picker - Only shows after type selection */}
          {shouldShowIngredientPicker() && (
            <div className={`mt-12 transition-all duration-1000 ease-out ${
              animationStage >= 3
                ? 'opacity-100 blur-0 translate-y-0' 
                : 'opacity-0 blur-sm translate-y-12'
            }`}>
              <IngredientPicker
                selectedIngredients={selectedIngredients} 
                onIngredientToggle={(ingredient) => {
                  setSelectedIngredients(prev => 
                    prev.includes(ingredient) 
                      ? prev.filter(i => i !== ingredient)
                      : [...prev, ingredient]
                  );
                }}
                onGenerateRecipe={handleGenerateRecipe}
              />
            </div>
          )}

          {/* Recipe Generator - Only shows after ingredients selection */}
          {shouldShowRecipeGenerator() && (
            <div className="mt-12 transition-all duration-700 opacity-100 blur-0 translate-y-0">
              <RecipeGenerator 
                mood={selectedMood}
                type={selectedType}
                ingredients={selectedIngredients}
                onBack={resetSelection}
              />
            </div>
          )}
        </div>
      </main>

      <ContactFooter />
    </div>
  );
};

export default Index;