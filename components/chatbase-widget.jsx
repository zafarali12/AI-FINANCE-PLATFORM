"use client";

import { useEffect } from "react";

export default function ChatbaseWidget({ onOpenChange }) {
  useEffect(() => {
    // Listen for chatbase widget open/close events
    const handleChatbaseEvent = (event) => {
      if (event.data?.type === "chatbase") {
        if (event.data.action === "open" && onOpenChange) {
          onOpenChange(true);
        } else if (event.data.action === "close" && onOpenChange) {
          onOpenChange(false);
        }
      }
    };

    window.addEventListener("message", handleChatbaseEvent);

    return () => {
      window.removeEventListener("message", handleChatbaseEvent);
    };
  }, [onOpenChange]);

  useEffect(() => {
    // Initialize Chatbase
    if (typeof window !== "undefined") {
      // Chatbase initialization script
      (function () {
        if (
          !window.chatbase ||
          window.chatbase("getState") !== "initialized"
        ) {
          window.chatbase = (...args) => {
            if (!window.chatbase.q) {
              window.chatbase.q = [];
            }
            window.chatbase.q.push(args);
          };
          window.chatbase = new Proxy(window.chatbase, {
            get(target, prop) {
              if (prop === "q") {
                return target.q;
              }
              return (...args) => target(prop, ...args);
            },
          });
        }

        const onLoad = function () {
          // Check if script already exists
          if (document.getElementById("zCjCTADb6uV2wlhMTjdKW")) {
            return;
          }

          const script = document.createElement("script");
          script.src = "https://www.chatbase.co/embed.min.js";
          script.id = process.env.NEXT_PUBLIC_CHATBASE_ID;
        
          script.domain = "www.chatbase.co";
          script.defer = true;
          document.body.appendChild(script);
        };

        if (document.readyState === "complete") {
          onLoad();
        } else {
          window.addEventListener("load", onLoad);
        }
      })();
    }

    // Cleanup function
    return () => {
      // Remove script when component unmounts
      const script = document.getElementById("zCjCTADb6uV2wlhMTjdKW");
      if (script) {
        script.remove();
      }
    };
  }, []);

  // Expose a global function to open the chatbot
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.openChatbase = () => {
        // Try to open the chatbase widget
        if (window.chatbase) {
          window.chatbase("open");
        }
        // Also try clicking the chatbase button if it exists
        const chatbaseButton = document.querySelector('[id*="chatbase"]');
        if (chatbaseButton) {
          chatbaseButton.click();
        }
      };
    }
  }, []);

  return null; // This component doesn't render anything visible
}
