"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, Shield } from "lucide-react";

const HeroSection = () => {
  const imageRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement?.classList.add("scrolled");
      } else {
        imageElement?.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gray-50 dark:bg-gray-950" />
      
      {/* Subtle Glows */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-[100px] opacity-20" />
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-[100px] opacity-10" />

      <div className="container mx-auto text-center relative z-10">
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 ${mounted ? 'animate-fade-in-up stagger-1' : 'opacity-0'}`}>
          <Sparkles className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-medium">AI-Powered Finance Management</span>
        </div>

        {/* Main Heading */}
        <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold pb-6 text-gray-900 dark:text-white tracking-tight ${mounted ? 'animate-fade-in-up stagger-2' : 'opacity-0'}`}>
          Manage Your Finances
          <br />
          <span className="text-blue-600 dark:text-blue-400">
            with Intelligence
          </span>
        </h1>

        {/* Description */}
        <p className={`text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed ${mounted ? 'animate-fade-in-up stagger-3' : 'opacity-0'}`}>
          An AI-powered financial management platform that helps you track,
          analyze, and optimize your spending with real-time insights and smart recommendations.
        </p>

        {/* Feature Pills */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 ${mounted ? 'animate-fade-in-up stagger-4' : 'opacity-0'}`}>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Smart Analytics</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Secure & Private</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row justify-center gap-4 mb-16 ${mounted ? 'animate-fade-in-up stagger-5' : 'opacity-0'}`}>
          <Link href="/dashboard">
            <Button size="lg" className="px-8 py-6 text-lg group bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all">
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="https://www.youtube.com/roadsidecoder">
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-2 dark:border-gray-700 dark:hover:bg-gray-800">
              Watch Demo
            </Button>
          </Link>
        </div>

        {/* Dashboard Preview */}
        <div className={`hero-image-wrapper mt-12 ${mounted ? 'animate-scale-in stagger-6' : 'opacity-0'}`}>
          <div ref={imageRef} className="hero-image relative group">
            <div className="absolute inset-0 bg-blue-500 rounded-xl blur-3xl opacity-10 group-hover:opacity-20 transition-opacity" />
            <Image
              src="/banner.jpeg"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-xl shadow-2xl border-2 border-gray-200 dark:border-gray-800 mx-auto relative z-10 hover:scale-[1.02] transition-transform duration-500"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
