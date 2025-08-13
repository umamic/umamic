const ContactFooter = () => {
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