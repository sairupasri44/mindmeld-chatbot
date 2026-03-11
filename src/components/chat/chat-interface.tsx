"use client";

import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Sparkles, Trash2, Settings, MessageSquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './chat-message';
import { TypingIndicator } from './typing-indicator';
import { generateChatbotResponse } from '@/ai/flows/generate-chatbot-response';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Message = {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Load history from local storage (simulating persistent session management)
  useEffect(() => {
    const saved = localStorage.getItem('mindmeld_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        })));
      } catch (e) {
        console.error("Failed to load chat history", e);
      }
    } else {
      // Welcome message
      const welcome: Message = {
        id: 'welcome',
        role: 'bot',
        content: "Hi there! I'm MindMeld, your intelligent assistant. How can I help you today?",
        timestamp: new Date()
      };
      setMessages([welcome]);
    }
  }, []);

  // Save history
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('mindmeld_history', JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    const scrollContainer = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await generateChatbotResponse({ message: input });
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: response.response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: "I'm sorry, I'm having trouble processing your request right now. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    const welcome: Message = {
      id: 'welcome-' + Date.now(),
      role: 'bot',
      content: "Chat cleared. I'm ready for new questions!",
      timestamp: new Date()
    };
    setMessages([welcome]);
    localStorage.removeItem('mindmeld_history');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4 md:p-6">
      <Card className="flex flex-col h-full border-none shadow-xl bg-white overflow-hidden rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between border-b px-6 py-4 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-xl text-primary">
              <Sparkles size={24} />
            </div>
            <div>
              <CardTitle className="text-xl font-headline font-bold text-foreground">MindMeld Chat</CardTitle>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">AI Powered Assistant</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={clearChat} title="Clear Chat" className="text-muted-foreground hover:text-destructive">
              <Trash2 size={18} />
            </Button>
            <Button variant="ghost" size="icon" title="Settings" className="text-muted-foreground">
              <Settings size={18} />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0 overflow-hidden bg-[#F8FAFC]">
          <ScrollArea className="h-full px-6 py-6" ref={scrollAreaRef}>
            <div className="flex flex-col">
              {messages.map((msg) => (
                <ChatMessage 
                  key={msg.id} 
                  role={msg.role} 
                  content={msg.content} 
                  timestamp={msg.timestamp} 
                />
              ))}
              {isTyping && <TypingIndicator />}
            </div>
          </ScrollArea>
        </CardContent>

        <div className="p-4 md:p-6 bg-white border-t">
          <form onSubmit={handleSendMessage} className="relative flex items-end gap-3 max-w-3xl mx-auto">
            <div className="relative flex-1 group">
              <Input
                placeholder="Type your message here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping}
                className="pr-12 py-6 rounded-2xl border-2 border-slate-100 focus-visible:ring-primary focus-visible:border-primary transition-all bg-slate-50/50"
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl transition-transform active:scale-95 disabled:opacity-30"
              >
                <SendHorizontal size={20} />
              </Button>
            </div>
          </form>
          <div className="mt-4 flex justify-center gap-2">
            <Badge variant="secondary" className="bg-slate-100 text-[10px] text-muted-foreground cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors py-1" onClick={() => setInput("How does this AI work?")}>
              How does this AI work?
            </Badge>
            <Badge variant="secondary" className="bg-slate-100 text-[10px] text-muted-foreground cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors py-1" onClick={() => setInput("Help me write an email")}>
              Help me write an email
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
