import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

const ContactFooter = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button className="text-muted-foreground hover:text-foreground transition-colors underline">
              socials
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <div className="flex flex-col gap-4 py-4">
              <h3 className="text-lg font-semibold text-center">Follow us on social media</h3>
              <div className="flex flex-col gap-3">
                <a
                  href="https://www.tiktok.com/@hiumamic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 rounded-lg border hover:bg-accent transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  TikTok
                </a>
                <a
                  href="https://www.youtube.com/@hiumamic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 rounded-lg border hover:bg-accent transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  YouTube
                </a>
                <a
                  href="https://www.instagram.com/hiumamic/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 rounded-lg border hover:bg-accent transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Instagram
                </a>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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