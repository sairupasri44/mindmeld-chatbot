import { ChatInterface } from '@/components/chat/chat-interface';
import { MessageSquare } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20">
      <nav className="h-16 border-b bg-white flex items-center px-6 md:px-12 sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <div className="bg-primary h-8 w-8 rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/30">
            <MessageSquare size={18} />
          </div>
          <span className="font-headline font-bold text-lg tracking-tight text-foreground">
            MindMeld <span className="text-primary">Studio</span>
          </span>
        </div>
        <div className="ml-auto hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">Features</a>
          <a href="#" className="hover:text-primary transition-colors">Pricing</a>
          <a href="#" className="hover:text-primary transition-colors">Documentation</a>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-slate-800 transition-all">
            Get Started
          </button>
        </div>
      </nav>

      <div className="relative pt-8 pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none -z-10" />
        <div className="max-w-4xl mx-auto px-6 mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-headline font-extrabold text-foreground tracking-tight mb-2">
            Automate Support with <span className="text-primary">Intelligence</span>
          </h1>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            Experience the next generation of conversational AI. Fast, accurate, and secure interactions for your users.
          </p>
        </div>
        
        <ChatInterface />
      </div>

      <footer className="py-8 border-t bg-white text-center">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} MindMeld AI Systems. Powered by Genkit & Firebase.
        </p>
      </footer>
    </main>
  );
}
