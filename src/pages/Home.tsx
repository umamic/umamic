import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ContactFooter from '@/components/ContactFooter';
import { useMemo } from 'react';

const words = ['recipes', 'crafted', 'for', 'you'];

const Home = () => {
  const tagline = useMemo(() => words, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-center items-center">
          <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
            <img
              src="/lovable-uploads/cb716a45-b8b6-47cb-bceb-5960453e7e8b.png"
              alt="umamic logo"
              className="h-16 w-16"
              loading="lazy"
            />
            <span className="sr-only">umamic home</span>
          </Link>
        </div>
      </header>

      <main className="pt-24 pb-32">
        <section className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-lg md:text-xl text-muted-foreground mb-3 animate-blur-in">meet umamic</h2>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            {tagline.map((w, i) => (
              <span key={w + i} className="inline-block animate-fade-in mr-3" style={{ animationDelay: `${i * 120}ms` }}>
                {w}
              </span>
            ))}
          </h1>

          <p className="text-muted-foreground mb-10 max-w-xl mx-auto animate-fade-in" style={{ animationDelay: '600ms' }}>
            choose ingredients, get a great recipe, enjoy
          </p>
          <Link to="/start">
            <Button size="lg" className="generate-button">try it out →</Button>
          </Link>
        </section>
      </main>

      <ContactFooter />
    </div>
  );
};

export default Home;
