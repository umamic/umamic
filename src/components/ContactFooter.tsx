const ContactFooter = () => {
  return (
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
    </footer>
  );
};

export default ContactFooter;