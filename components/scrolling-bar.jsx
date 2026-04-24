import React from "react";
import { Sparkles, BrainCircuit, TrendingUp, ShieldCheck, PieChart, Zap } from "lucide-react";

const ITEMS = [
  { text: "AI Powered Insights", icon: Sparkles },
  { text: "Smart Budgeting", icon: PieChart },
  { text: "Real-Time Tracking", icon: TrendingUp },

  { text: "Automated Reports", icon: BrainCircuit },
  { text: "Instant Alerts", icon: Zap },
];

export const ScrollingBar = () => {
  return (
    <div className="w-full bg-blue-600/5 dark:bg-blue-900/20 border-y border-blue-100 dark:border-gray-800 overflow-hidden py-4 flex items-center shadow-inner relative z-10">
      <style suppressHydrationWarning>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333333%); }
        }
        .animate-marquee-infinite {
          animation: marquee 25s linear infinite;
        }
        .marquee-container:hover .animate-marquee-infinite {
          animation-play-state: paused;
        }
      `}</style>

      <div className="marquee-container flex whitespace-nowrap overflow-hidden max-w-full">
        <div className="flex w-max animate-marquee-infinite items-center">
          {[...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
            <div key={i} className="flex items-center space-x-3 px-10">
              <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold text-gray-800 dark:text-gray-200 tracking-wider">
                {item.text}
              </span>
              <span className="text-blue-200 dark:text-blue-800/50 pl-10 text-2xl font-bold">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
