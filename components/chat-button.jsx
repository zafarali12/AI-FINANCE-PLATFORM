"use client";

import { Button } from "./ui/button";
import { MessageCircle } from "lucide-react";

export default function ChatButton() {
  const handleOpenChat = () => {
    // Call the global function to open chatbase
    if (typeof window !== "undefined" && window.openChatbase) {
      window.openChatbase();
    } else {
      // Fallback: try to find and click the chatbase button
      setTimeout(() => {
        const chatbaseButton = document.querySelector(
          '[id*="chatbase"], [class*="chatbase"]'
        );
        if (chatbaseButton) {
          chatbaseButton.click();
        }
      }, 100);
    }
  };

  return (
    <Button
      variant="ghost"
      className="flex items-center gap-2 text-white-600 hover:text-blue-600"
      onClick={handleOpenChat}
    >
      <MessageCircle size={18} />
      <span className="hidden md:inline">Chat with AI FIN BOT</span>
    </Button>
  );
}
