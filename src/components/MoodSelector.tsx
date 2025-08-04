import { useState } from 'react';

interface Mood {
  emoji: string;
  label: string;
  description: string;
}

const moods: Mood[] = [
  { emoji: '😴', label: 'Tired', description: 'Something comforting and easy' },
  { emoji: '😌', label: 'Cozy', description: 'Warm and soothing vibes' },
  { emoji: '🎨', label: 'Creative', description: 'Experimental and fun' },
  { emoji: '💔', label: 'Sad', description: 'Soul-healing comfort food' },
  { emoji: '🥴', label: 'Hungover', description: 'Recovery fuel needed' },
  { emoji: '🚀', label: 'Energetic', description: 'Bold and exciting flavors' },
  { emoji: '🧘', label: 'Calm', description: 'Light and peaceful' },
  { emoji: '🔥', label: 'Spicy', description: 'Heat and intensity' },
  { emoji: '🌱', label: 'Fresh', description: 'Clean and vibrant' },
  { emoji: '🍫', label: 'Indulgent', description: 'Rich and decadent' }
];

interface MoodSelectorProps {
  selectedMood: string | null;
  onMoodSelect: (mood: string) => void;
}

const MoodSelector = ({ selectedMood, onMoodSelect }: MoodSelectorProps) => {
  const [hoveredMood, setHoveredMood] = useState<string | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto px-6">
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
          <div className="mt-8 text-center">
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