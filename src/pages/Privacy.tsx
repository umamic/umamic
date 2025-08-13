import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <button 
            onClick={() => navigate('/')}
            className="text-2xl font-bold tracking-tight hover:text-muted-foreground transition-colors"
          >
            umamic
          </button>
          
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            back
          </Button>
        </div>
      </header>

      <main className="pt-24 pb-32">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-8">privacy policy</h1>
          
          <div className="space-y-6 text-muted-foreground">
            <p><strong>Effective Date:</strong> August 4, 2025<br/>
            <strong>Last Updated:</strong> August 4, 2025</p>
            
            <p>umamic ("we", "us", or "our") is committed to protecting your privacy. this privacy policy describes how we collect, use, and disclose information when you use our website and services.</p>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">1. information we collect</h2>
              <p>We collect limited personal data, including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Input Data:</strong> Mood, selected ingredients, and preferences.</li>
                <li><strong>Device & Usage Info:</strong> IP address, browser type, usage logs (via cookies/analytics).</li>
                <li><strong>Optional Info:</strong> If you sign up or log in, we may store your email address or auth token.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">2. how we use your information</h2>
              <p>We use the data to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Generate AI-powered recipe suggestions.</li>
                <li>Improve and personalize the user experience.</li>
                <li>Monitor site performance and fix bugs.</li>
                <li>Comply with legal obligations.</li>
              </ul>
              <p>We do not sell or share your personal information with third parties for advertising purposes.</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">3. cookies & analytics</h2>
              <p>We may use cookies and tools like Google Analytics to understand how users interact with Umamic.</p>
              <p>You can disable cookies in your browser settings.</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">4. data security</h2>
              <p>We take reasonable measures to protect your data but cannot guarantee 100% security. Use at your own discretion.</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">5. children's privacy</h2>
              <p>Umamic is not intended for users under 13. We do not knowingly collect personal data from children.</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">6. your rights</h2>
              <p>Depending on your location (e.g., GDPR or CCPA), you may have rights to access, delete, or restrict your data.</p>
              <p>To exercise these rights, contact: <a href="mailto:hiumamic@outlook.com" className="underline">hiumamic@outlook.com</a></p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">7. changes to this policy</h2>
              <p>We may update this Privacy Policy from time to time. Changes will be posted here with a revised date.</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">8. contact us</h2>
              <p>For questions, contact:<br/>
              📧 <a href="mailto:hiumamic@outlook.com" className="underline">hiumamic@outlook.com</a></p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;