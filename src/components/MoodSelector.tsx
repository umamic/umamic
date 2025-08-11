import { useState } from 'react';

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
  const [hoveredMood, setHoveredMood] = useState<string | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto px-6 relative pb-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          what's your flavor?
        </h1>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          how are you feeling?
        </h2>
        
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {moods.map((mood) => (
            <div
              key={mood.label}
              className={`mood-chip ${selectedMood === mood.label ? 'active' : ''}`}
              onClick={() => onMoodSelect(mood.label)}
              onMouseEnter={() => setHoveredMood(mood.label)}
              onMouseLeave={() => setHoveredMood(null)}
            >
              <span className="text-2xl mr-2">{mood.emoji}</span>
              <span>{mood.label}</span>
            </div>
          ))}
        </div>

        {(selectedMood || hoveredMood) && (
          <div className="absolute bottom-0 left-0 right-0 text-center h-8 flex items-center justify-center">
            <p className="text-muted-foreground italic">
              {moods.find(m => m.label === (selectedMood || hoveredMood))?.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodSelector;