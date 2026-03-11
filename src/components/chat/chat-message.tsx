import React from 'react';
import { cn } from '@/lib/utils';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div className={cn("flex max-w-[80%] gap-3", isUser ? "flex-row-reverse" : "flex-row")}>
        <div className={cn(
          "h-8 w-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
          isUser ? "bg-primary text-primary-foreground" : "bg-white border border-border text-primary"
        )}>
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>
        <div className="flex flex-col gap-1">
          <div className={cn(
            "p-3 text-sm leading-relaxed",
            isUser ? "chat-bubble-user" : "chat-bubble-bot"
          )}>
            {content}
          </div>
          <span className={cn(
            "text-[10px] text-muted-foreground px-1",
            isUser ? "text-right" : "text-left"
          )}>
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
}
