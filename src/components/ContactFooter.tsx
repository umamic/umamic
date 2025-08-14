const ContactFooter = () => {
  const openSocials = () => {
    window.open('https://www.tiktok.com/@hiumamic', '_blank');
    window.open('https://www.youtube.com/@hiumamic', '_blank');
    window.open('https://www.instagram.com/hiumamic/', '_blank');
  };

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
        <button
          onClick={openSocials}
          className="text-muted-foreground hover:text-foreground transition-colors underline"
        >
          socials
        </button>
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