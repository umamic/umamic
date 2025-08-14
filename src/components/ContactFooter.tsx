import { useState } from 'react';

const ContactFooter = () => {
  const [showSocials, setShowSocials] = useState(false);

  return (
    <>
      <footer className="fixed bottom-4 right-4 z-50 flex gap-4 text-sm">
        <a 
          href="mailto:hiumamic@outlook.com"
          className="text-muted-foreground hover:text-foreground transition-colors underline"
        >
          contact
        </a>
        <a 
          href="/terms"
          className="text-muted-foreground hover:text-foreground transition-colors underline"
        >
          terms
        </a>
        <a 
          href="/privacy"
          className="text-muted-foreground hover:text-foreground transition-colors underline"
        >
          privacy
        </a>
        <div className="relative">
          <button 
            className="text-muted-foreground hover:text-foreground transition-colors underline"
            onMouseEnter={() => setShowSocials(true)}
            onMouseLeave={() => setShowSocials(false)}
          >
            socials
          </button>
          {showSocials && (
            <div 
              className="absolute bottom-full right-0 mb-2 p-3 bg-background border rounded-lg shadow-lg min-w-32 animate-fade-in"
              onMouseEnter={() => setShowSocials(true)}
              onMouseLeave={() => setShowSocials(false)}
            >
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.tiktok.com/@hiumamic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
                >
                  TikTok
                </a>
                <a
                  href="https://www.youtube.com/@hiumamic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
                >
                  YouTube
                </a>
                <a
                  href="https://www.instagram.com/hiumamic/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
                >
                  Instagram
                </a>
              </div>
            </div>
          )}
        </div>
        <button
          data-tally-open="nrZjdR"
          data-tally-width="400"
          data-tally-auto-close="0"
          className="text-muted-foreground hover:text-foreground transition-colors underline"
        >
          feedback
        </button>
      </footer>
    </>
  );
};

export default ContactFooter;