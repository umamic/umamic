import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ContactFooter from '@/components/ContactFooter';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <img
              src="/lovable-uploads/018c4664-ef4b-4530-b004-79d11a34c958.png"
              alt="umamic logo - spoon and fork"
              className="h-8 w-8"
              loading="lazy"
            />
            <span className="sr-only">umamic home</span>
          </Link>
        </div>
      </header>

      <main className="pt-24 pb-32">
        <section className="max-w-4xl mx-auto px-6 text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            meet umamic — recipes crafted for you
          </h1>
          <p className="text-muted-foreground mb-10">
            pick your mood, choose ingredients, get a great recipe.
          </p>
          <Link to="/start">
            <Button size="lg" className="generate-button">start →</Button>
          </Link>
        </section>
      </main>

      <ContactFooter />
    </div>
  );
};

export default Home;
