import { useState } from 'react';
import MoodSelector from '@/components/MoodSelector';
import TypeSelector from '@/components/TypeSelector';
import IngredientPicker from '@/components/IngredientPicker';
import RecipeGenerator from '@/components/RecipeGenerator';
import ContactFooter from '@/components/ContactFooter';
import { Button } from '@/components/ui/button';

type Step = 'mood' | 'type' | 'ingredients' | 'recipe';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>('mood');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
  };

  const handleIngredientToggle = (ingredient: string) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleNext = () => {
    if (currentStep === 'mood' && selectedMood) {
      setCurrentStep('type');
    } else if (currentStep === 'type' && selectedType) {
      setCurrentStep('ingredients');
    } else if (currentStep === 'ingredients' && selectedIngredients.length > 0) {
      setCurrentStep('recipe');
    }
  };

  const handleBack = () => {
    if (currentStep === 'type') {
      setCurrentStep('mood');
    } else if (currentStep === 'ingredients') {
      setCurrentStep('type');
    } else if (currentStep === 'recipe') {
      setCurrentStep('ingredients');
    }
  };

  const handleReset = () => {
    setCurrentStep('mood');
    setSelectedMood(null);
    setSelectedType(null);
    setSelectedIngredients([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <button 
            onClick={handleReset}
            className="text-2xl font-bold tracking-tight hover:text-muted-foreground transition-colors"
          >
            umamic
          </button>
          
          {currentStep !== 'mood' && (
            <Button
              variant="ghost"
              onClick={handleBack}
              className="text-muted-foreground hover:text-foreground"
            >
              ← back
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-32">
        {currentStep === 'mood' && (
          <div className="min-h-[calc(100vh-8rem)] flex flex-col justify-center">
            <MoodSelector
              selectedMood={selectedMood}
              onMoodSelect={handleMoodSelect}
            />
          </div>
        )}

        {currentStep === 'type' && (
          <div className="min-h-[calc(100vh-8rem)] flex flex-col justify-center">
            <TypeSelector
              selectedType={selectedType}
              onTypeSelect={handleTypeSelect}
            />
          </div>
        )}

        {currentStep === 'ingredients' && (
          <div className="min-h-[calc(100vh-8rem)] flex flex-col">
            <div className="flex-1">
              <IngredientPicker
                selectedIngredients={selectedIngredients}
                onIngredientToggle={handleIngredientToggle}
              />
            </div>
          </div>
        )}

        {currentStep === 'recipe' && selectedMood && selectedType && (
          <div className="py-8">
            <RecipeGenerator
              mood={selectedMood}
              type={selectedType}
              ingredients={selectedIngredients}
              onBack={handleBack}
            />
          </div>
        )}
      </main>

      {/* Fixed Bottom Action */}
      {currentStep !== 'recipe' && (
        <div className="fixed bottom-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm border-t border-border">
          <div className="max-w-6xl mx-auto px-6 py-6 text-center">
            {currentStep === 'mood' && selectedMood && (
              <Button onClick={handleNext} className="generate-button">
                what are you making? →
              </Button>
            )}

            {currentStep === 'type' && selectedType && (
              <Button onClick={handleNext} className="generate-button">
                choose ingredients →
              </Button>
            )}
            
            {currentStep === 'ingredients' && selectedIngredients.length > 0 && (
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  feeling <span className="font-medium">{selectedMood}</span>, making a{' '}
                  <span className="font-medium">{selectedType?.toLowerCase()}</span> with{' '}
                  <span className="font-medium">{selectedIngredients.length} ingredients</span>
                </div>
                <Button onClick={handleNext} className="generate-button">
                  generate recipe →
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Progress Indicator */}
      {currentStep !== 'recipe' && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex space-x-2">
            <div className={`w-2 h-2 rounded-full transition-colors ${
              currentStep === 'mood' ? 'bg-primary' : 'bg-muted'
            }`} />
            <div className={`w-2 h-2 rounded-full transition-colors ${
              currentStep === 'type' ? 'bg-primary' : 'bg-muted'
            }`} />
            <div className={`w-2 h-2 rounded-full transition-colors ${
              currentStep === 'ingredients' ? 'bg-primary' : 'bg-muted'
            }`} />
          </div>
        </div>
      )}

      <ContactFooter />
    </div>
  );
};

export default Index;