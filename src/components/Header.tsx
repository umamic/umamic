import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = () => {
  const handleSignUp = () => {
    // TODO: Implement sign up functionality
    console.log('Sign up clicked');
  };

  const handleLogIn = () => {
    // TODO: Implement log in functionality
    console.log('Log in clicked');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-background/95 backdrop-blur-sm">
      <div className="max-w-[400px] mx-auto h-[60px] flex items-center justify-between px-2">
        {/* Logo Area */}
        <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
          <img
            src="/lovable-uploads/0aa5b245-2d2f-47ba-bf18-7796c0f19c17.png"
            alt="umamic logo"
            className="w-[120px] h-[40px] object-contain"
            loading="lazy"
          />
          <span className="sr-only">umamic home</span>
        </Link>

        {/* Button Container */}
        <div className="flex gap-2">
          <Button
            onClick={handleSignUp}
            className="w-[80px] h-[28px] text-xs rounded bg-secondary text-secondary-foreground hover:bg-secondary/80 px-0"
          >
            Sign Up
          </Button>
          <Button
            onClick={handleLogIn}
            variant="outline"
            className="w-[80px] h-[28px] text-xs rounded border-secondary text-secondary hover:bg-secondary/10 px-0"
          >
            Log In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;