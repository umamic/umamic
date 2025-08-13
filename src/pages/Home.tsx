import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ContactFooter from '@/components/ContactFooter';
import { useState, useEffect, useRef } from 'react';

const meetWords = ['meet', 'umamic'];
const recipeWords = ['recipes', 'crafted', 'for', 'you'];

const steps = [
  {
    number: "step 1",
    title: "select ingredients",
    description: "search for the ingredients available in your kitchen through the search bar or through the different food categories",
    emoji: "🔍",
    position: "left"
  },
  {
    number: "step 2", 
    title: "get a great recipe",
    description: "our specifically trained ai model will handpick the best of the best recipes with the ingredients you have that will make you go yum",
    emoji: "🤖",
    position: "right"
  },
  {
    number: "step 3",
    title: "enjoy", 
    description: "simply follow the instructions and voila!",
    emoji: "😋",
    position: "left"
  }
];

const Home = () => {
  const [animationStage, setAnimationStage] = useState(0);
  const [showSteps, setShowSteps] = useState(false);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Stage 1: Show "meet umamic" words one by one
    timers.push(setTimeout(() => setAnimationStage(1), 500));
    timers.push(setTimeout(() => setAnimationStage(2), 1000));
    
    // Stage 2: Hide meet umamic and show recipes crafted for you
    timers.push(setTimeout(() => setAnimationStage(3), 2500));
    
    // Stage 3: Show steps and auto-scroll
    timers.push(setTimeout(() => {
      setShowSteps(true);
      setAnimationStage(4);
      
      // Auto-scroll to steps with easing
      setTimeout(() => {
        if (stepsRef.current) {
          stepsRef.current.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
          });
        }
      }, 500);
    }, 4000));

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
            <img
              src="/lovable-uploads/97d2794e-ae8f-4125-bd01-20fe8dac93f8.png"
              alt="umamic logo"
              className="h-24 w-auto"
              loading="lazy"
            />
            <span className="sr-only">umamic home</span>
          </Link>
        </div>
      </header>

      <main className="pt-24 pb-32">
        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col justify-center items-center px-6">
          {/* Meet Umamic Animation */}
          <div className={`transition-all duration-1000 ${animationStage >= 3 ? 'opacity-0 -translate-y-10' : 'opacity-100'}`}>
            <div className="text-6xl md:text-8xl font-bold mb-8 text-center">
              {meetWords.map((word, i) => (
                <span 
                  key={word}
                  className={`inline-block mr-6 transition-all duration-700 ${
                    animationStage >= i + 1 
                      ? 'opacity-100 blur-0 translate-y-0' 
                      : 'opacity-0 blur-sm translate-y-10'
                  }`}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          {/* Recipes Crafted For You Animation */}
          <div className={`transition-all duration-1000 ${animationStage >= 3 ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-center">
              {recipeWords.map((word, i) => (
                <span 
                  key={word}
                  className={`inline-block mr-3 transition-all duration-500 ${
                    animationStage >= 3 
                      ? 'opacity-100 blur-0 translate-y-0' 
                      : 'opacity-0 blur-sm translate-y-5'
                  }`}
                  style={{ 
                    transitionDelay: animationStage >= 3 ? `${i * 150}ms` : '0ms'
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>
            
          </div>
        </section>

        {/* Steps Section */}
        {showSteps && (
          <section ref={stepsRef} className="max-w-2xl mx-auto px-6 space-y-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`bg-card border border-border rounded-2xl p-8 transition-all duration-700 hover:scale-105 ${
                  animationStage >= 4 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-20 scale-95'
                } ${step.position === 'right' ? 'flex-row-reverse' : 'flex-row'} flex items-center gap-8`}
                style={{ 
                  transitionDelay: `${index * 200 + 500}ms`
                }}
              >
                <div className="text-8xl flex-shrink-0">
                  {step.emoji}
                </div>
                <div className={`flex-1 ${step.position === 'right' ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-lg font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                    {step.number}
                  </h3>
                  <h4 className="text-3xl font-bold mb-4 capitalize">
                    {step.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Try It Out Button */}
            <div className={`text-center mt-12 transition-all duration-700 ${
              animationStage >= 4 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-90'
            }`} style={{ transitionDelay: '1400ms' }}>
              <Link to="/start">
                <Button size="lg" className={`generate-button text-xl px-8 py-4 transition-all duration-1000 ${
                  animationStage >= 4 
                    ? 'shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)] animate-pulse' 
                    : ''
                }`} style={{ transitionDelay: '2000ms' }}>
                  try it out →
                </Button>
              </Link>
            </div>
          </section>
        )}
      </main>

      <ContactFooter />
    </div>
  );
};

export default Home;
