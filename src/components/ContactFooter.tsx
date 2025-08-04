const ContactFooter = () => {
  return (
    <footer className="fixed bottom-4 right-4">
      <button
        onClick={() => window.open('mailto:hiumamic@outlook.com', '_blank')}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
      >
        contact
      </button>
    </footer>
  );
};

export default ContactFooter;