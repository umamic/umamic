import { useState, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Mood {
  emoji: string;
  label: string;
  description: string;
}

const moods: Mood[] = [
  { emoji: '😴', label: 'tired', description: 'low effort, quick and easy' },
  { emoji: '😌', label: 'relaxed', description: 'medium effort, balanced cooking' },
  { emoji: '💪', label: 'motivated', description: 'high effort, elaborate recipes' }
];

interface MoodSelectorProps {
  selectedMood: string | null;
  onMoodSelect: (mood: string) => void;
}

const MoodSelector = ({ selectedMood, onMoodSelect }: MoodSelectorProps) => {
  return (
    <TooltipProvider>
      <div className="w-full max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            before the fun...
          </h1>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            how are you feeling?
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {moods.map((mood) => (
              <Tooltip key={mood.label} delayDuration={1000}>
                <TooltipTrigger asChild>
                  <div
                    className={`mood-chip ${selectedMood === mood.label ? 'active' : ''}`}
                    onClick={() => onMoodSelect(mood.label)}
                  >
                    <span className="text-2xl mr-2">{mood.emoji}</span>
                    <span>{mood.label}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{mood.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MoodSelector;