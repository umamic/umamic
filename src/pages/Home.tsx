import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ContactFooter from '@/components/ContactFooter';
import { useMemo } from 'react';
import { useInView } from '@/hooks/use-in-view';

const words = ['recipes', 'crafted', 'for', 'you'];

const StepCard = ({ index, title, description }: { index: number; title: string; description: string }) => {
  const { ref, inView } = useInView({ threshold: 0.2 });
  return (
    <div
      ref={ref as any}
      className={`reveal ${inView ? 'in-view' : ''} bg-card/30 backdrop-blur-md border border-border/60 rounded-2xl p-6 md:p-8 shadow-lg`}
    >
      <div className="text-sm text-muted-foreground mb-2">step {index}</div>
      <h3 className="text-xl md:text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Home = () => {
  const tagline = useMemo(() => words, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <img
              src="/lovable-uploads/018c4664-ef4b-4530-b004-79d11a34c958.png"
              alt="umamic logo - spoon and fork"
              className="h-12 w-12"
              loading="lazy"
            />
            <span className="sr-only">umamic home</span>
          </Link>
        </div>
      </header>

      <main className="pt-24 pb-32">
        <section className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-xl md:text-2xl text-muted-foreground mb-3 animate-blur-in">meet umamic</h2>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            {tagline.map((w, i) => (
              <span key={w + i} className="inline-block animate-fade-in" style={{ animationDelay: `${i * 120}ms` }}>
                {w}{' '}
              </span>
            ))}
          </h1>

          <p className="text-muted-foreground mb-10 max-w-xl mx-auto animate-fade-in" style={{ animationDelay: '600ms' }}>
            pick your mood, choose ingredients, get a great recipe.
          </p>
          <Link to="/start">
            <Button size="lg" className="generate-button">try it out →</Button>
          </Link>
        </section>

        <section className="max-w-6xl mx-auto px-6 mt-24 grid gap-6 md:gap-8 md:grid-cols-3">
          <StepCard index={1} title="choose your ingredients" description="tell us what you have on hand — no need to include everything." />
          <StepCard index={2} title="get a great recipe" description="we craft a logical recipe using only what you picked (or say no recipe if none fit)." />
          <StepCard index={3} title="enjoy" description="cook with confidence and keep it simple and delicious." />
        </section>
      </main>

      <ContactFooter />
    </div>
  );
};

export default Home;
