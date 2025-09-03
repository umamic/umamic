import { useState, useEffect, useRef } from 'react';
import FeedbackForm from '@/components/FeedbackForm';

const ContactFooter = () => {
  const [showSocials, setShowSocials] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (socialsRef.current && !socialsRef.current.contains(event.target as Node)) {
        setShowSocials(false);
      }
    };

    if (showSocials) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSocials]);

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
        <div 
          ref={socialsRef}
          className="relative"
        >
          <button 
            onClick={() => setShowSocials(!showSocials)}
            className="text-muted-foreground hover:text-foreground transition-colors underline"
          >
            socials
          </button>
          {showSocials && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 bg-background border rounded-lg shadow-lg animate-fade-in z-50">
              <div className="flex flex-row gap-4 whitespace-nowrap">
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
          onClick={() => setShowFeedback(true)}
          className="text-muted-foreground hover:text-foreground transition-colors underline"
        >
          feedback
        </button>
      </footer>
      
      {showFeedback && (
        <FeedbackForm onClose={() => setShowFeedback(false)} />
      )}
    </>
  );
};

export default ContactFooter;