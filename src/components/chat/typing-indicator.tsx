import React from 'react';

export function TypingIndicator() {
  return (
    <div className="flex items-center space-x-1 py-3 px-4 bg-white border border-border rounded-2xl rounded-tl-none shadow-sm w-fit animate-in fade-in slide-in-from-left-2 duration-300">
      <div className="typing-dot"></div>
      <div className="typing-dot"></div>
      <div className="typing-dot"></div>
    </div>
  );
}
